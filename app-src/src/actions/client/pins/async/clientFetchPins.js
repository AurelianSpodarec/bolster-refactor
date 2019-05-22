import axios from 'axios';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import {
    CLIENT_FETCH_PINS_REQUEST,
    CLIENT_FETCH_PINS_SUCCESS,
    CLIENT_FETCH_PINS_FAILURE
} from 'constants/client/actionTypes/clientPins';

export const clientFetchPinsRequest = () => ({
    type: CLIENT_FETCH_PINS_REQUEST
});

export const clientFetchPinsSuccess = payload => ({
    type: CLIENT_FETCH_PINS_SUCCESS,
    payload
});

export const clientFetchPinsFailure = error => ({
    type: CLIENT_FETCH_PINS_FAILURE,
    error
});

export default (type, id) => dispatch => {
    dispatch(clientFetchPinsRequest(type, id));

    return axios
        .get(`${API_URL}/pins/${type}/${id}`, getHeaders())
        .then(res => dispatch(clientFetchPinsSuccess(res.data)))
        .catch(err => dispatch(clientFetchPinsFailure(err.message)));
};
