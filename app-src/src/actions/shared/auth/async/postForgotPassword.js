import axios from 'axios';

import { AUTH_API_URL } from 'config/index';
import { getHeaders, handleErrors } from 'helpers/api';
import {
    POST_FORGOT_PASSWORD_REQUEST,
    POST_FORGOT_PASSWORD_SUCCESS,
    POST_FORGOT_PASSWORD_FAILURE
} from 'constants/actionTypes/auth';

export const postForgotPasswordRequest = () => ({
    type: POST_FORGOT_PASSWORD_REQUEST
});

export const postForgotPasswordSuccess = () => ({
    type: POST_FORGOT_PASSWORD_SUCCESS
});

export const postForgotPasswordFailure = error => ({
    type: POST_FORGOT_PASSWORD_FAILURE,
    error
});

export default postBody => dispatch => {
    dispatch(postForgotPasswordRequest());

    return (
        axios
            // ! check this endpoint when this is set up
            .post(`${AUTH_API_URL}/auth/forgot-password`, postBody, getHeaders())
            .then(res => dispatch(postForgotPasswordSuccess(res.data)))
            .catch(err =>
                dispatch(handleErrors(postForgotPasswordFailure)(err))
            )
    );
};
