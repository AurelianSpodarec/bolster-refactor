import axios from 'axios';
import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';

import {
    FETCH_ALL_DROPDOWN_OPTIONS_REQUEST,
    FETCH_ALL_DROPDOWN_OPTIONS_SUCCESS,
    FETCH_ALL_DROPDOWN_OPTIONS_FAILURE
} from 'constants/actionTypes/dropdownOptions';

export const fetchAllDropdownOptionsRequest = () => ({
    type: FETCH_ALL_DROPDOWN_OPTIONS_REQUEST
});

export const fetchAllDropdownOptionsSuccess = payload => ({
    type: FETCH_ALL_DROPDOWN_OPTIONS_SUCCESS,
    payload
});

export const fetchAllDropdownOptionsFailure = error => ({
    type: FETCH_ALL_DROPDOWN_OPTIONS_FAILURE,
    error
});

export default type => dispatch => {
    dispatch(fetchAllDropdownOptionsRequest());

    axios
        .get(`${API_URL}/dropdownoptions/${type}`, getHeaders())
        .then(res => dispatch(fetchAllDropdownOptionsSuccess(res.data)))
        .catch(err => dispatch(fetchAllDropdownOptionsFailure(err.message)));
};
