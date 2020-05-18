import axios from 'axios';

import {
    FETCH_PIN_OPTION_MANUFACTURERS_REQUEST,
    FETCH_PIN_OPTION_MANUFACTURERS_SUCCESS,
    FETCH_PIN_OPTION_MANUFACTURERS_FAILURE,
} from 'constants/actionTypes/companyAdminManufacturers';
import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';

export const fetchManufacturersByPinOptionTypeRequest = () => ({
    type: FETCH_PIN_OPTION_MANUFACTURERS_REQUEST,
});

export const fetchManufacturersByPinOptionTypeSuccess = (payload, pinOptionType) => ({
    type: FETCH_PIN_OPTION_MANUFACTURERS_SUCCESS,
    payload,
    pinOptionType,
});

export const fetchManufacturersByPinOptionTypeFailure = error => ({
    type: FETCH_PIN_OPTION_MANUFACTURERS_FAILURE,
    error,
});

export default pinOptionType => dispatch => {
    dispatch(fetchManufacturersByPinOptionTypeRequest());

    return axios
        .get(`${API_URL}/manufacturer/${pinOptionType}`, getHeaders())
        .then(({ data }) => dispatch(fetchManufacturersByPinOptionTypeSuccess(data, pinOptionType)))
        .catch(err => dispatch(fetchManufacturersByPinOptionTypeFailure(err.message)));
};
