import axios from 'axios';

import { getHeaders, handleErrors } from 'helpers/api';
import {
    POST_CONFIRM_DISABLE_TWO_FACTOR_REQUEST,
    POST_CONFIRM_DISABLE_TWO_FACTOR_SUCCESS,
    POST_CONFIRM_DISABLE_TWO_FACTOR_FAILURE,
} from 'constants/actionTypes/auth';
import { AUTH_API_URL } from 'config';

export const postConfirmDisableTwoFactorRequest = () => ({
    type: POST_CONFIRM_DISABLE_TWO_FACTOR_REQUEST,
});

export const postConfirmDisableTwoFactorSuccess = payload => ({
    type: POST_CONFIRM_DISABLE_TWO_FACTOR_SUCCESS,
    payload,
});

export const postConfirmDisableTwoFactorFailure = error => ({
    type: POST_CONFIRM_DISABLE_TWO_FACTOR_FAILURE,
    error,
});

export default postBody => dispatch => {
    dispatch(postConfirmDisableTwoFactorRequest());

    return axios
        .post(`${AUTH_API_URL}/auth/twofactor/disable/confirm`, postBody, getHeaders())
        .then(res => dispatch(postConfirmDisableTwoFactorSuccess(res.data)))
        .catch(err => dispatch(handleErrors(postConfirmDisableTwoFactorFailure)(err)));
};
