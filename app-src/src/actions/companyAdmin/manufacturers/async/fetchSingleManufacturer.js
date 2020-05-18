import axios from 'axios';

import {
    FETCH_SINGLE_MANUFACTURER_REQUEST,
    FETCH_SINGLE_MANUFACTURER_SUCCESS,
    FETCH_SINGLE_MANUFACTURER_FAILURE,
} from 'constants/actionTypes/companyAdminManufacturers';
import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';

export const fetchSingleManufacturerRequest = () => ({
    type: FETCH_SINGLE_MANUFACTURER_REQUEST,
});

export const fetchSingleManufacturerSuccess = (payload, pinOptionType) => ({
    type: FETCH_SINGLE_MANUFACTURER_SUCCESS,
    payload,
    pinOptionType,
});

export const fetchSingleManufacturerFailure = error => ({
    type: FETCH_SINGLE_MANUFACTURER_FAILURE,
    error,
});

export default (id, pinOptionType) => dispatch => {
    dispatch(fetchSingleManufacturerRequest());

    return axios
        .get(`${API_URL}/manufacturer/single/${id}`, getHeaders())
        .then(({ data }) => dispatch(fetchSingleManufacturerSuccess(data, pinOptionType)))
        .catch(err => dispatch(fetchSingleManufacturerFailure(err.message)));
};
