import axios from 'axios';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import {
    FETCH_SINGLE_PIN_REQUEST,
    FETCH_SINGLE_PIN_SUCCESS,
    FETCH_SINGLE_PIN_FAILURE
} from 'constants/actionTypes/pins';

export const fetchSinglePinRequest = keepPinData => ({
    type: FETCH_SINGLE_PIN_REQUEST,
    keepPinData
});

export const fetchSinglePinSuccess = (payload, keepPinData) => ({
    type: FETCH_SINGLE_PIN_SUCCESS,
    payload,
    keepPinData
});

export const fetchSinglePinFailure = error => ({
    type: FETCH_SINGLE_PIN_FAILURE,
    error
});

export default (id, keepPinData) => dispatch => {
    dispatch(fetchSinglePinRequest(keepPinData));

    return axios
        .get(`${API_URL}/pins/${id}`, getHeaders())
        .then(res => dispatch(fetchSinglePinSuccess(res.data, keepPinData)))
        .catch(err => dispatch(fetchSinglePinFailure(err.message)));
};
