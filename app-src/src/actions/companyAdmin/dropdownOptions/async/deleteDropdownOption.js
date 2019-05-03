import axios from 'axios';

import {
    DELETE_DROPDOWN_OPTION_REQUEST,
    DELETE_DROPDOWN_OPTION_SUCCESS,
    DELETE_DROPDOWN_OPTION_FAILURE
} from 'constants/actionTypes/dropdownOptions';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';

export const deleteDropdownOptionRequest = () => ({
    type: DELETE_DROPDOWN_OPTION_REQUEST
});

export const deleteDropdownOptionSuccess = id => ({
    type: DELETE_DROPDOWN_OPTION_SUCCESS,
    id
});

export const deleteDropdownOptionFailure = error => ({
    type: DELETE_DROPDOWN_OPTION_FAILURE,
    error
});

export default (id, type) => dispatch => {
    dispatch(deleteDropdownOptionRequest());
    return axios
        .delete(`${API_URL}/dropdownoptions/${type}/${id}`, getHeaders())
        .then(() => dispatch(deleteDropdownOptionSuccess(id)))
        .catch(err => dispatch(deleteDropdownOptionFailure(err.message)));
};
