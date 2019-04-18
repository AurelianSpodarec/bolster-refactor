import axios from 'axios';

import {
    FETCH_TIMEZONES_REQUEST,
    FETCH_TIMEZONES_SUCCESS,
    FETCH_TIMEZONES_FAILURE
} from 'constants/actionTypes/accounts';
import { getHeaders } from 'helpers/api';
import { AUTH_API_URL } from 'config';

export const fetchTimezonesRequest = () => ({
    type: FETCH_TIMEZONES_REQUEST
});

export const fetchTimezonesSuccess = payload => ({
    type: FETCH_TIMEZONES_SUCCESS,
    payload
});

export const fetchTimezonesFailure = error => ({
    type: FETCH_TIMEZONES_FAILURE,
    error
});

export default () => dispatch => {
    dispatch(fetchTimezonesRequest());

    axios
        .get(`${AUTH_API_URL}/localisation/timezones`, getHeaders())
        .then(res => dispatch(fetchTimezonesSuccess(res.data)))
        .catch(err => dispatch(fetchTimezonesFailure(err.message)));
};
