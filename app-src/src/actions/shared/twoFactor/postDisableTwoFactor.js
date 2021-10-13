import axios from 'axios';

import { getHeaders, handleErrors } from 'helpers/api';
import {
    POST_DISABLE_TWO_FACTOR_REQUEST,
    POST_DISABLE_TWO_FACTOR_SUCCESS,
    POST_DISABLE_TWO_FACTOR_FAILURE,
} from 'constants/actionTypes/auth';
import { AUTH_API_URL } from 'config';

export const postDisableTwoFactorRequest = () => ({
    type: POST_DISABLE_TWO_FACTOR_REQUEST,
});

export const postDisableTwoFactorSuccess = () => ({
    type: POST_DISABLE_TWO_FACTOR_SUCCESS,
});

export const postDisableTwoFactorFailure = error => ({
    type: POST_DISABLE_TWO_FACTOR_FAILURE,
    error,
});

export default (postBody = {}) => dispatch => {
    dispatch(postDisableTwoFactorRequest());

    return axios
        .post(`${AUTH_API_URL}/auth/twofactor/disable`, postBody, getHeaders())
        .then(res => dispatch(postDisableTwoFactorSuccess(res.data)))
        .catch(err => dispatch(handleErrors(postDisableTwoFactorFailure)(err)));
};
