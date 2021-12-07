import axios from 'axios';

import { getHeaders, handleErrors } from 'helpers/api';
import {
    POST_CHANGE_EMAIL_CONFIRMATION_REQUEST,
    POST_CHANGE_EMAIL_CONFIRMATION_SUCCESS,
    POST_CHANGE_EMAIL_CONFIRMATION_FAILURE,
} from 'constants/actionTypes/auth';
import { AUTH_API_URL } from 'config';

export const postEmailConfirmationRequest = () => ({
    type: POST_CHANGE_EMAIL_CONFIRMATION_REQUEST,
});

export const postEmailConfirmationSuccess = () => ({
    type: POST_CHANGE_EMAIL_CONFIRMATION_SUCCESS,
});

export const postEmailConfirmationFailure = error => ({
    type: POST_CHANGE_EMAIL_CONFIRMATION_FAILURE,
    error,
});

export default token => dispatch => {
    dispatch(postEmailConfirmationRequest());

    return axios
        .post(`${AUTH_API_URL}/auth/change-email/confirm/${token}`, {}, getHeaders())
        .then(res => dispatch(postEmailConfirmationSuccess(res.data)))
        .catch(err => dispatch(handleErrors(postEmailConfirmationFailure)(err)));
};
