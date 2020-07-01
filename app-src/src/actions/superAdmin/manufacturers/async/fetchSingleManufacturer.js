import axios from 'axios';

import {
    SA_FETCH_SINGLE_MANUFACTURER_REQUEST,
    SA_FETCH_SINGLE_MANUFACTURER_SUCCESS,
    SA_FETCH_SINGLE_MANUFACTURER_FAILURE,
} from 'constants/actionTypes/superAdminManufacturers';
import { ADMIN_API_URL } from 'config';
import { getHeaders } from 'helpers/api';

export const fetchSingleManufacturerRequest = () => ({
    type: SA_FETCH_SINGLE_MANUFACTURER_REQUEST,
});

export const fetchSingleManufacturerSuccess = (payload, pinOptionType) => ({
    type: SA_FETCH_SINGLE_MANUFACTURER_SUCCESS,
    payload,
    pinOptionType,
});

export const fetchSingleManufacturerFailure = error => ({
    type: SA_FETCH_SINGLE_MANUFACTURER_FAILURE,
    error,
});

export default (id, pinOptionType) => dispatch => {
    dispatch(fetchSingleManufacturerRequest());

    return axios
        .get(`${ADMIN_API_URL}/manufacturer/single/${id}`, getHeaders())
        .then(({ data }) => dispatch(fetchSingleManufacturerSuccess(data, pinOptionType)))
        .catch(err => dispatch(fetchSingleManufacturerFailure(err.message)));
};
