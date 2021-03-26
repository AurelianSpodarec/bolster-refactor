import axios from 'axios';

import { getHeaders, handleErrors } from 'helpers/api';
import {
    POST_FORGOT_PASSWORD_REQUEST,
    POST_FORGOT_PASSWORD_SUCCESS,
    POST_FORGOT_PASSWORD_FAILURE,
} from 'constants/actionTypes/auth';

import { AUTH_API_URL } from 'config';

export const postForgotPasswordRequest = () => ({
    type: POST_FORGOT_PASSWORD_REQUEST,
});

export const postForgotPasswordSuccess = () => ({
    type: POST_FORGOT_PASSWORD_SUCCESS,
});

export const postForgotPasswordFailure = error => ({
    type: POST_FORGOT_PASSWORD_FAILURE,
    error,
});

export default postBody => dispatch => {
    dispatch(postForgotPasswordRequest());

    return axios
        .post(`${AUTH_API_URL}/auth/requestpasswordreset`, postBody, getHeaders())
        .then(res => dispatch(postForgotPasswordSuccess(res.data)))
        .catch(err => dispatch(handleErrors(postForgotPasswordFailure)(err)));
};
