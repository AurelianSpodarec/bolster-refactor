import axios from 'axios';

import { AUTH_API_URL } from 'config/index';
import { getHeaders, handleErrors } from 'helpers/api';
import {
    POST_LOGIN_REQUEST,
    POST_LOGIN_SUCCESS,
    POST_LOGIN_FAILURE,
    POST_LOGIN_EMAIL_CONFIRMATION_REQUIRED,
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

export const postLoginEmailConirmationRequired = email => ({
    type: POST_LOGIN_EMAIL_CONFIRMATION_REQUIRED,
    email,
});
export const postLoginTwoFactorRequired = () => ({
    type: POST_LOGIN_TWO_FACTOR_REQUIRED,
});

export default (email, password, twoFactorCode = null) =>
    dispatch => {
        dispatch(postLoginRequest());
        // * Password is trimmed to remove whitespace from end at client request
        const trimmedPassword = password.trim();
        return axios
            .post(
                `${AUTH_API_URL}/auth/login`,
                { email, password: trimmedPassword, twoFactorCode },
                getHeaders(),
            )
            .then(({ data }) => {
                if (data.isEmailConfirmationRequired) {
                    return dispatch(postLoginEmailConirmationRequired(email));
                }
                if (data.isTwoFactorRequired) {
                    return dispatch(postLoginTwoFactorRequired(email));
                }
                // todo figure out if company was received in response, this tells us where to go next!
                localStorage.setItem('selectedCompany', '');
                localStorage.setItem('token', data.token);
                return dispatch(postLoginSuccess(data));
            })
            .catch(err => dispatch(handleErrors(postLoginFailure)(err)));
    };
