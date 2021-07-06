import axios from 'axios';

import { getHeaders, handleErrors } from 'helpers/api';
import {
    FETCH_PASSWORD_REGEX_REQUEST,
    FETCH_PASSWORD_REGEX_SUCCESS,
    FETCH_PASSWORD_REGEX_FAILURE,
} from 'constants/actionTypes/auth';
import { AUTH_API_URL } from 'config';

export const fetchPasswordRegexRequest = () => ({
    type: FETCH_PASSWORD_REGEX_REQUEST,
});

export const fetchPasswordRegexSuccess = payload => ({
    type: FETCH_PASSWORD_REGEX_SUCCESS,
    payload,
});

export const fetchPasswordRegexFailure = error => ({
    type: FETCH_PASSWORD_REGEX_FAILURE,
    error,
});

export default () => dispatch => {
    dispatch(fetchPasswordRegexRequest());
    return axios
        .get(`${AUTH_API_URL}/auth/passwordregex`, getHeaders())
        .then(res => dispatch(fetchPasswordRegexSuccess(res.data)))
        .catch(err => dispatch(handleErrors(fetchPasswordRegexFailure)(err)));
};
