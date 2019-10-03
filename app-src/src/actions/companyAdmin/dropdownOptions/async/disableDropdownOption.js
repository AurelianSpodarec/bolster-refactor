import axios from 'axios';

import {
    DISABLE_DROPDOWN_OPTION_REQUEST,
    DISABLE_DROPDOWN_OPTION_SUCCESS,
    DISABLE_DROPDOWN_OPTION_FAILURE
} from 'constants/actionTypes/dropdownOptions';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';

export const disableDropdownOptionRequest = () => ({
    type: DISABLE_DROPDOWN_OPTION_REQUEST
});

export const disableDropdownOptionSuccess = id => ({
    type: DISABLE_DROPDOWN_OPTION_SUCCESS,
    id
});

export const disableDropdownOptionFailure = error => ({
    type: DISABLE_DROPDOWN_OPTION_FAILURE,
    error
});

export default (id, type) => dispatch => {
    dispatch(disableDropdownOptionRequest());
    return axios
        .post(`${API_URL}/dropdownoptions/${type}/${id}/disable`, getHeaders())
        .then(() => dispatch(disableDropdownOptionSuccess(id)))
        .catch(err => dispatch(disableDropdownOptionFailure(err.message)));
};
