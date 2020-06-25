import axios from 'axios';

import {
    SA_FETCH_PIN_OPTION_MANUFACTURERS_REQUEST,
    SA_FETCH_PIN_OPTION_MANUFACTURERS_SUCCESS,
    SA_FETCH_PIN_OPTION_MANUFACTURERS_FAILURE,
} from 'constants/actionTypes/superAdminManufacturers';
import { ADMIN_API_URL } from 'config';
import { getHeaders } from 'helpers/api';

export const fetchManufacturersByPinOptionTypeRequest = () => ({
    type: SA_FETCH_PIN_OPTION_MANUFACTURERS_REQUEST,
});

export const fetchManufacturersByPinOptionTypeSuccess = (payload, pinOptionType) => ({
    type: SA_FETCH_PIN_OPTION_MANUFACTURERS_SUCCESS,
    payload,
    pinOptionType,
});

export const fetchManufacturersByPinOptionTypeFailure = error => ({
    type: SA_FETCH_PIN_OPTION_MANUFACTURERS_FAILURE,
    error,
});

export default pinOptionType => dispatch => {
    dispatch(fetchManufacturersByPinOptionTypeRequest());

    return axios
        .get(`${ADMIN_API_URL}/manufacturer/${pinOptionType}`, getHeaders())
        .then(({ data }) => dispatch(fetchManufacturersByPinOptionTypeSuccess(data, pinOptionType)))
        .catch(err => dispatch(fetchManufacturersByPinOptionTypeFailure(err.message)));
};
