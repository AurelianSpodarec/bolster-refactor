import axios from 'axios';

import { getHeaders, handleErrors } from 'helpers/api';
import {
    CHECK_PASSWORD_RESET_VALID_REQUEST,
    CHECK_PASSWORD_RESET_VALID_SUCCESS,
    CHECK_PASSWORD_RESET_VALID_FAILURE,
} from 'constants/actionTypes/auth';
import { AUTH_API_URL } from 'config';

export const checkPasswordResetValidRequest = () => ({
    type: CHECK_PASSWORD_RESET_VALID_REQUEST,
});

export const checkPasswordResetValidSuccess = () => ({
    type: CHECK_PASSWORD_RESET_VALID_SUCCESS,
});

export const checkPasswordResetValidFailure = error => ({
    type: CHECK_PASSWORD_RESET_VALID_FAILURE,
    error,
});

export default token => dispatch => {
    dispatch(checkPasswordResetValidRequest());

    return axios
        .get(`${AUTH_API_URL}/auth/PasswordReset/${token}`, getHeaders())
        .then(({ data }) => {
            dispatch(checkPasswordResetValidSuccess(data));
        })
        .catch(err => dispatch(handleErrors(checkPasswordResetValidFailure)(err)));
};
