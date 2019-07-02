import axios from 'axios';

import { getHeaders, handleErrors } from 'helpers/api';
import {
    POST_FORGOT_PASSWORD_REQUEST,
    POST_FORGOT_PASSWORD_SUCCESS,
    POST_FORGOT_PASSWORD_FAILURE
} from 'constants/actionTypes/auth';
import { FRONTEND_API_URL } from 'config';

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
            .post(`${FRONTEND_API_URL}/forgotpassword`, postBody, getHeaders())
            .then(res => dispatch(postForgotPasswordSuccess(res.data)))
            .catch(err =>
                dispatch(handleErrors(postForgotPasswordFailure)(err))
            )
    );
};
