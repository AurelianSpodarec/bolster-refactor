import axios from 'axios';

import { getHeaders, handleErrors } from 'helpers/api';
import {
    POST_SETUP_TWO_FACTOR_REQUEST,
    POST_SETUP_TWO_FACTOR_SUCCESS,
    POST_SETUP_TWO_FACTOR_FAILURE,
} from 'constants/actionTypes/auth';
import { AUTH_API_URL } from 'config';

export const postSetupTwoFactorRequest = () => ({
    type: POST_SETUP_TWO_FACTOR_REQUEST,
});

export const postSetupTwoFactorSuccess = () => ({
    type: POST_SETUP_TWO_FACTOR_SUCCESS,
});

export const postSetupTwoFactorFailure = error => ({
    type: POST_SETUP_TWO_FACTOR_FAILURE,
    error,
});

export default postBody => dispatch => {
    dispatch(postSetupTwoFactorRequest());

    return axios
        .post(`${AUTH_API_URL}/auth/twofactor/setup`, postBody, getHeaders())
        .then(res => dispatch(postSetupTwoFactorSuccess(res.data)))
        .catch(err => dispatch(handleErrors(postSetupTwoFactorFailure)(err)));
};
