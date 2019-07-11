import axios from 'axios';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import {
    FETCH_SINGLE_PIN_REQUEST,
    FETCH_SINGLE_PIN_SUCCESS,
    FETCH_SINGLE_PIN_FAILURE
} from 'constants/actionTypes/pins';

export const fetchSinglePinRequest = isForDrawing => ({
    type: FETCH_SINGLE_PIN_REQUEST,
    isForDrawing
});

export const fetchSinglePinSuccess = (payload, isForDrawing) => ({
    type: FETCH_SINGLE_PIN_SUCCESS,
    payload,
    isForDrawing
});

export const fetchSinglePinFailure = error => ({
    type: FETCH_SINGLE_PIN_FAILURE,
    error
});

export default (id, isForDrawing) => dispatch => {
    dispatch(fetchSinglePinRequest(isForDrawing));

    return axios
        .get(`${API_URL}/pins/${id}`, getHeaders())
        .then(res => dispatch(fetchSinglePinSuccess(res.data, isForDrawing)))
        .catch(err => dispatch(fetchSinglePinFailure(err.message)));
};
