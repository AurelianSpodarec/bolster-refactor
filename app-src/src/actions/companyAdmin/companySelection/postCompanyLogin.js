import axios from 'axios';

import { getHeaders } from 'helpers/api';
import setAPIFieldErrors from 'actions/shared/generic/fieldErrors/sync/setAPIFieldErrors';
import {
    POST_COMPANY_LOGIN_REQUEST,
    POST_COMPANY_LOGIN_SUCCESS,
    POST_COMPANY_LOGIN_FAILURE,
} from 'constants/actionTypes/companies';
import { AUTH_API_URL } from 'config';

export const postCompanyLoginRequest = () => ({
    type: POST_COMPANY_LOGIN_REQUEST,
});

export const postCompanyLoginSuccess = payload => ({
    type: POST_COMPANY_LOGIN_SUCCESS,
    payload,
});

export const postCompanyLoginFailure = error => ({
    type: POST_COMPANY_LOGIN_FAILURE,
    error,
});

export default postBody => dispatch => {
    dispatch(postCompanyLoginRequest());

    // todo url
    return axios
        .post(`${AUTH_API_URL}/auth/company`, postBody, getHeaders())
        .then(({ data }) => {
            localStorage.setItem('token', data.token);
            return dispatch(postCompanyLoginSuccess(data));
        })
        .catch(err => {
            console.error({ err });
            if (err.response.status === 400) {
                return dispatch(setAPIFieldErrors(err.response.data.errors));
            }
            const message = err.response?.data ?? err.message;
            return dispatch(postCompanyLoginFailure(message));
        });
};
