import axios from 'axios';

import { getHeaders, handleErrors } from 'helpers/api';
import {
    POST_PASSWORD_RESET_REQUEST,
    POST_PASSWORD_RESET_SUCCESS,
    POST_PASSWORD_RESET_FAILURE,
} from 'constants/actionTypes/auth';
import { AUTH_API_URL } from 'config';

export const postPasswordResetRequest = () => ({
    type: POST_PASSWORD_RESET_REQUEST,
});

export const postPasswordResetSuccess = () => ({
    type: POST_PASSWORD_RESET_SUCCESS,
});

export const postPasswordResetFailure = error => ({
    type: POST_PASSWORD_RESET_FAILURE,
    error,
});

export default postBody => dispatch => {
    dispatch(postPasswordResetRequest());

    return axios
        .post(`${AUTH_API_URL}/auth/PasswordReset`, postBody, getHeaders())
        .then(({ data }) => {
            localStorage.setItem('token', data.token);
            dispatch(postPasswordResetSuccess(data));
        })
        .catch(err => dispatch(handleErrors(postPasswordResetFailure)(err)));
};
