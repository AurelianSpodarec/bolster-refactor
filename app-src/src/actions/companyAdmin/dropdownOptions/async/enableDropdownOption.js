import axios from 'axios';

import {
    ENABLE_DROPDOWN_OPTION_REQUEST,
    ENABLE_DROPDOWN_OPTION_SUCCESS,
    ENABLE_DROPDOWN_OPTION_FAILURE
} from 'constants/actionTypes/dropdownOptions';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';

export const enableDropdownOptionRequest = () => ({
    type: ENABLE_DROPDOWN_OPTION_REQUEST
});

export const enableDropdownOptionSuccess = id => ({
    type: ENABLE_DROPDOWN_OPTION_SUCCESS,
    id
});

export const enableDropdownOptionFailure = error => ({
    type: ENABLE_DROPDOWN_OPTION_FAILURE,
    error
});

export default (id, type) => dispatch => {
    dispatch(enableDropdownOptionRequest());
    return axios
        .post(`${API_URL}/dropdownoptions/${type}/${id}/disable`, getHeaders())
        .then(() => dispatch(enableDropdownOptionSuccess(id)))
        .catch(err => dispatch(enableDropdownOptionFailure(err.message)));
};
