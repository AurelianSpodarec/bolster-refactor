import axios from 'axios';

import {
    TOGGLE_DROPDOWN_OPTION_REQUEST,
    TOGGLE_DROPDOWN_OPTION_SUCCESS,
    TOGGLE_DROPDOWN_OPTION_FAILURE
} from 'constants/actionTypes/dropdownOptions';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';

export const toggleDropdownOptionRequest = () => ({
    type: TOGGLE_DROPDOWN_OPTION_REQUEST
});

export const toggleDropdownOptionSuccess = (id, payload) => ({
    type: TOGGLE_DROPDOWN_OPTION_SUCCESS,
    id,
    payload
});

export const toggleDropdownOptionFailure = error => ({
    type: TOGGLE_DROPDOWN_OPTION_FAILURE,
    error
});

export default (id, type, isEnableRequest) => dispatch => {
    dispatch(toggleDropdownOptionRequest());

    return axios
        .post(
            `${API_URL}/dropdownoptions/${type}/${id}/disable${
                isEnableRequest ? '?undo=true' : ''
            }`,
            {},
            getHeaders()
        )
        .then(({ data }) => dispatch(toggleDropdownOptionSuccess(id, data)))
        .catch(err => dispatch(toggleDropdownOptionFailure(err.message)));
};
