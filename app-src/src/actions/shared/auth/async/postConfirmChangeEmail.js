import axios from 'axios';

import { getHeaders, handleErrors } from 'helpers/api';
import {
    POST_EMAIL_CONFIRMATION_REQUEST,
    POST_EMAIL_CONFIRMATION_SUCCESS,
    POST_EMAIL_CONFIRMATION_FAILURE,
} from 'constants/actionTypes/auth';
import { AUTH_API_URL } from 'config';

export const postEmailConfirmationRequest = () => ({
    type: POST_EMAIL_CONFIRMATION_REQUEST,
});

export const postEmailConfirmationSuccess = () => ({
    type: POST_EMAIL_CONFIRMATION_SUCCESS,
});

export const postEmailConfirmationFailure = error => ({
    type: POST_EMAIL_CONFIRMATION_FAILURE,
    error,
});

export default postBody => dispatch => {
    dispatch(postEmailConfirmationRequest());

    return axios
        .post(`${AUTH_API_URL}/auth/email-confirmation/confirm`, postBody, getHeaders())
        .then(res => dispatch(postEmailConfirmationSuccess(res.data)))
        .catch(err => dispatch(handleErrors(postEmailConfirmationFailure)(err)));
};
