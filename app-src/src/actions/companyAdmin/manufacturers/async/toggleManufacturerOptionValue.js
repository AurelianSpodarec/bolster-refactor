import axios from 'axios';

import {
    TOGGLE_MANUFACTURER_OPTION_VALUE_REQUEST,
    TOGGLE_MANUFACTURER_OPTION_VALUE_SUCCESS,
    TOGGLE_MANUFACTURER_OPTION_VALUE_FAILURE,
} from 'constants/actionTypes/companyAdminManufacturers';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';

export const toggleManufacturerOptionValueRequest = () => ({
    type: TOGGLE_MANUFACTURER_OPTION_VALUE_REQUEST,
});

export const toggleManufacturerOptionValueSuccess = (id, payload) => ({
    type: TOGGLE_MANUFACTURER_OPTION_VALUE_SUCCESS,
    id,
    payload,
});

export const toggleManufacturerOptionValueFailure = error => ({
    type: TOGGLE_MANUFACTURER_OPTION_VALUE_FAILURE,
    error,
});

export default (id, type, isEnableRequest) => dispatch => {
    dispatch(toggleManufacturerOptionValueRequest());

    return axios
        .post(
            `${API_URL}/dropdownoptions/${type}/${id}/disable${
                isEnableRequest ? '?undo=true' : ''
            }`,
            {},
            getHeaders(),
        )
        .then(({ data }) => dispatch(toggleManufacturerOptionValueSuccess(id, data)))
        .catch(err => dispatch(toggleManufacturerOptionValueFailure(err.message)));
};
