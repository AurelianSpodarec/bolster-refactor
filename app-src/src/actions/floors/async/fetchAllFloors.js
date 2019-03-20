import axios from 'axios';
import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';

import {
    FETCH_ALL_FLOORS_REQUEST,
    FETCH_ALL_FLOORS_SUCCESS,
    FETCH_ALL_FLOORS_FAILURE
} from 'constants/actionTypes/floors';

export const fetchAllFloorsRequest = () => ({
    type: FETCH_ALL_FLOORS_REQUEST
});

export const fetchAllFloorsSuccess = payload => ({
    type: FETCH_ALL_FLOORS_SUCCESS,
    payload
});

export const fetchAllFloorsFailure = error => ({
    type: FETCH_ALL_FLOORS_FAILURE,
    error
});

export default () => dispatch => {
    dispatch(fetchAllFloorsRequest());

    axios
        .get(`${API_URL}/floors`, getHeaders())
        .then(res => dispatch(fetchAllFloorsSuccess(res.data)))
        .catch(err => dispatch(fetchAllFloorsFailure(err.message)));
};
