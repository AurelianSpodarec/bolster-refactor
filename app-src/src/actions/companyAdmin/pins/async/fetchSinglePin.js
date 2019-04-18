import axios from 'axios';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import {
    FETCH_SINGLE_PIN_REQUEST,
    FETCH_SINGLE_PIN_SUCCESS,
    FETCH_SINGLE_PIN_FAILURE
} from 'constants/actionTypes/pins';

export const fetchSinglePinRequest = () => ({
    type: FETCH_SINGLE_PIN_REQUEST
});

export const fetchSinglePinSuccess = payload => ({
    type: FETCH_SINGLE_PIN_SUCCESS,
    payload
});

export const fetchSinglePinFailure = error => ({
    type: FETCH_SINGLE_PIN_FAILURE,
    error
});

export default id => dispatch => {
    dispatch(fetchSinglePinRequest());

    return axios
        .get(`${API_URL}/pins/${id}`, getHeaders())
        .then(res => dispatch(fetchSinglePinSuccess(res.data)))
        .catch(err => dispatch(fetchSinglePinFailure(err.message)));
};
