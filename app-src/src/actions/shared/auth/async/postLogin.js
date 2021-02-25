import axios from 'axios';

import { AUTH_API_URL } from 'config/index';
import { getHeaders, handleErrors } from 'helpers/api';
import {
    POST_LOGIN_REQUEST,
    POST_LOGIN_SUCCESS,
    POST_LOGIN_FAILURE,
    POST_LOGIN_TWO_FACTOR_REQUIRED,
} from 'constants/actionTypes/auth';

export const postLoginRequest = () => ({
    type: POST_LOGIN_REQUEST,
});

export const postLoginSuccess = payload => ({
    type: POST_LOGIN_SUCCESS,
    payload,
});

export const postLoginFailure = error => ({
    type: POST_LOGIN_FAILURE,
    error,
});

export const postLoginTwoFactorRequired = () => ({
    type: POST_LOGIN_TWO_FACTOR_REQUIRED,
});

export default (email, password, twoFactorCode = null) => dispatch => {
    dispatch(postLoginRequest());
    // * Password is trimmed to remove whitespace from end at client request
    const trimmedPassword = password.trim();
    return axios
        .post(
            `${AUTH_API_URL}/auth/login`,
            { email, password: trimmedPassword, twoFactorCode },
            getHeaders(),
        )
        .then(res => {
            if (res.data.isTwoFactorRequired) {
                return dispatch(postLoginTwoFactorRequired(email));
            }
            localStorage.setItem('token', res.data.token);
            return dispatch(postLoginSuccess(res.data));
        })
        .catch(err => dispatch(handleErrors(postLoginFailure)(err)));
};
