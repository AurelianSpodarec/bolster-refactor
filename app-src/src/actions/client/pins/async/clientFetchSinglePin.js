import axios from 'axios';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import {
    CLIENT_FETCH_SINGLE_PIN_REQUEST,
    CLIENT_FETCH_SINGLE_PIN_SUCCESS,
    CLIENT_FETCH_SINGLE_PIN_FAILURE
} from 'constants/client/actionTypes/clientPins';

export const clientFetchSinglePinRequest = () => ({
    type: CLIENT_FETCH_SINGLE_PIN_REQUEST
});

export const clientFetchSinglePinSuccess = payload => ({
    type: CLIENT_FETCH_SINGLE_PIN_SUCCESS,
    payload
});

export const clientFetchSinglePinFailure = error => ({
    type: CLIENT_FETCH_SINGLE_PIN_FAILURE,
    error
});

export default id => dispatch => {
    dispatch(clientFetchSinglePinRequest());

    return (
        axios

            // ! change this url
            .get(`${API_URL}/pins/${id}`, getHeaders())
            .then(res => dispatch(clientFetchSinglePinSuccess(res.data)))
            .catch(err => dispatch(clientFetchSinglePinFailure(err.message)))
    );
};
