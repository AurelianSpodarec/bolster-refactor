import axios from 'axios';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import {
    FETCH_PIN_OPTIONS_REQUEST,
    FETCH_PIN_OPTIONS_SUCCESS,
    FETCH_PIN_OPTIONS_FAILURE,
} from 'constants/actionTypes/pinOptions';

export const fetchPinOptionsRequest = () => ({
    type: FETCH_PIN_OPTIONS_REQUEST,
});

export const fetchPinOptionsSuccess = payload => ({
    type: FETCH_PIN_OPTIONS_SUCCESS,
    payload,
});

export const fetchPinOptionsFailure = error => ({
    type: FETCH_PIN_OPTIONS_FAILURE,
    error,
});

export default () => async dispatch => {
    dispatch(fetchPinOptionsRequest());

    return axios
        .get(`${API_URL}/pinoptions/options`, getHeaders())
        .then(res => dispatch(fetchPinOptionsSuccess(res.data)))
        .catch(err => dispatch(fetchPinOptionsFailure(err.message)));
};
