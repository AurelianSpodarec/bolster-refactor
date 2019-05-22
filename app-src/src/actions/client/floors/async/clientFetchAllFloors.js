import axios from 'axios';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import {
    CLIENT_FETCH_ALL_FLOORS_REQUEST,
    CLIENT_FETCH_ALL_FLOORS_SUCCESS,
    CLIENT_FETCH_ALL_FLOORS_FAILURE
} from 'constants/actionTypes/floors';

export const clientFetchAllFloorsRequest = () => ({
    type: CLIENT_FETCH_ALL_FLOORS_REQUEST
});

export const clientFetchAllFloorsSuccess = payload => ({
    type: CLIENT_FETCH_ALL_FLOORS_SUCCESS,
    payload
});

export const clientFetchAllFloorsFailure = error => ({
    type: CLIENT_FETCH_ALL_FLOORS_FAILURE,
    error
});

export default () => dispatch => {
    dispatch(clientFetchAllFloorsRequest());

    axios
        // ! change this url
        .get(`${API_URL}/floors`, getHeaders())
        .then(res => dispatch(clientFetchAllFloorsSuccess(res.data)))
        .catch(err => dispatch(clientFetchAllFloorsFailure(err.message)));
};
