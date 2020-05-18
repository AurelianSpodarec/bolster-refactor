import axios from 'axios';

import {
    TOGGLE_MANUFACTURER_REQUEST,
    TOGGLE_MANUFACTURER_SUCCESS,
    TOGGLE_MANUFACTURER_FAILURE,
} from 'constants/actionTypes/companyAdminManufacturers';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';

export const toggleManufacturerRequest = () => ({
    type: TOGGLE_MANUFACTURER_REQUEST,
});

export const toggleManufacturerSuccess = (id, payload) => ({
    type: TOGGLE_MANUFACTURER_SUCCESS,
    id,
    payload,
});

export const toggleManufacturerFailure = error => ({
    type: TOGGLE_MANUFACTURER_FAILURE,
    error,
});

export default (id, type, isEnableRequest) => dispatch => {
    dispatch(toggleManufacturerRequest());

    return axios
        .post(
            `${API_URL}/dropdownoptions/${type}/${id}/disable${
                isEnableRequest ? '?undo=true' : ''
            }`,
            {},
            getHeaders(),
        )
        .then(({ data }) => dispatch(toggleManufacturerSuccess(id, data)))
        .catch(err => dispatch(toggleManufacturerFailure(err.message)));
};
