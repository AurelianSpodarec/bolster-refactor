import axios from 'axios';

import { getHeaders, handleErrors } from 'helpers/api';
import {
    POST_CONFIRM_SETUP_TWO_FACTOR_REQUEST,
    POST_CONFIRM_SETUP_TWO_FACTOR_SUCCESS,
    POST_CONFIRM_SETUP_TWO_FACTOR_FAILURE,
} from 'constants/actionTypes/auth';
import { AUTH_API_URL } from 'config';

export const postConfirmSetupTwoFactorRequest = () => ({
    type: POST_CONFIRM_SETUP_TWO_FACTOR_REQUEST,
});

export const postConfirmSetupTwoFactorSuccess = payload => ({
    type: POST_CONFIRM_SETUP_TWO_FACTOR_SUCCESS,
    payload,
});

export const postConfirmSetupTwoFactorFailure = error => ({
    type: POST_CONFIRM_SETUP_TWO_FACTOR_FAILURE,
    error,
});

export default postBody => dispatch => {
    dispatch(postConfirmSetupTwoFactorRequest());

    return axios
        .post(`${AUTH_API_URL}/auth/twofactor/setup/confirm`, postBody, getHeaders())
        .then(res => dispatch(postConfirmSetupTwoFactorSuccess(res.data)))
        .catch(err => dispatch(handleErrors(postConfirmSetupTwoFactorFailure)(err)));
};
