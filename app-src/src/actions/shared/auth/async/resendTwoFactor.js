import axios from 'axios';

import { getHeaders, handleErrors } from 'helpers/api';
import {
    RESEND_TWO_FACTOR_REQUEST,
    RESEND_TWO_FACTOR_SUCCESS,
    RESEND_TWO_FACTOR_FAILURE,
} from 'constants/actionTypes/auth';

import { AUTH_API_URL } from 'config';

export const resendTwoFactorRequest = () => ({
    type: RESEND_TWO_FACTOR_REQUEST,
});

export const resendTwoFactorSuccess = () => ({
    type: RESEND_TWO_FACTOR_SUCCESS,
});

export const resendTwoFactorFailure = error => ({
    type: RESEND_TWO_FACTOR_FAILURE,
    error,
});

export default postBody => dispatch => {
    dispatch(resendTwoFactorRequest());

    return axios
        .post(`${AUTH_API_URL}/auth/twofactor/resend`, postBody, getHeaders())
        .then(res => dispatch(resendTwoFactorSuccess(res.data)))
        .catch(err => dispatch(handleErrors(resendTwoFactorFailure)(err)));
};
