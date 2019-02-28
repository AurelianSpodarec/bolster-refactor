import axios from 'axios';

import { API_URL } from 'config';
import { getHeaders, formatError } from 'helpers';
import {
    POST_LOGIN_REQUEST,
    POST_LOGIN_SUCCESS,
    POST_LOGIN_FAILURE
} from 'constants/login';

export const postLoginRequest = () => ({
    type: POST_LOGIN_REQUEST
});

export const postLoginSuccess = payload => ({
    type: POST_LOGIN_SUCCESS,
    payload
});

export const postLoginFailure = payload => ({
    type: POST_LOGIN_FAILURE,
    payload
});

export default (username, password) => dispatch => {
    dispatch(postLoginRequest());

    return axios
        .post('mockData/auth/auth.json', { username, password }, getHeaders())
        .then(res => dispatch(postLoginSuccess(res.data)))
        .catch(err => dispatch(postLoginFailure(formatError(err))));
};
