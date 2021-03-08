import axios from 'axios';

import { getHeaders, handleErrors } from 'helpers/api';
import {
    POST_RESEND_EMAIL_CONFIRMATION_REQUEST,
    POST_RESEND_EMAIL_CONFIRMATION_SUCCESS,
    POST_RESEND_EMAIL_CONFIRMATION_FAILURE,
} from 'constants/actionTypes/auth';
import { AUTH_API_URL } from 'config';

export const postResendEmailConfirmationRequest = () => ({
    type: POST_RESEND_EMAIL_CONFIRMATION_REQUEST,
});

export const postResendEmailConfirmationSuccess = () => ({
    type: POST_RESEND_EMAIL_CONFIRMATION_SUCCESS,
});

export const postResendEmailConfirmationFailure = error => ({
    type: POST_RESEND_EMAIL_CONFIRMATION_FAILURE,
    error,
});

export default postBody => dispatch => {
    dispatch(postResendEmailConfirmationRequest());

    return axios
        .post(`${AUTH_API_URL}/auth/email-confirmation/resend`, postBody, getHeaders())
        .then(res => dispatch(postResendEmailConfirmationSuccess(res.data)))
        .catch(err => dispatch(handleErrors(postResendEmailConfirmationFailure)(err)));
};
