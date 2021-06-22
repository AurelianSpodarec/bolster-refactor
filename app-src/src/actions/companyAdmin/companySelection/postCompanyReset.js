import axios from 'axios';

import { getHeaders } from 'helpers/api';
import setAPIFieldErrors from 'actions/shared/generic/fieldErrors/sync/setAPIFieldErrors';
import {
    POST_RESET_COMPANY_LOGIN_REQUEST,
    POST_RESET_COMPANY_LOGIN_SUCCESS,
    POST_RESET_COMPANY_LOGIN_FAILURE,
} from 'constants/actionTypes/companies';
import { AUTH_API_URL } from 'config';

export const postResetCompanyRequest = () => ({
    type: POST_RESET_COMPANY_LOGIN_REQUEST,
});

export const postResetCompanySuccess = payload => ({
    type: POST_RESET_COMPANY_LOGIN_SUCCESS,
    payload,
});

export const postResetCompanyFailure = error => ({
    type: POST_RESET_COMPANY_LOGIN_FAILURE,
    error,
});

export default () => dispatch => {
    dispatch(postResetCompanyRequest());

    // todo url
    return axios
        .post(`${AUTH_API_URL}/auth/company`, { companyID: null }, getHeaders())
        .then(({ data }) => {
            localStorage.setItem('token', data.token);
            return dispatch(postResetCompanySuccess(data));
        })
        .catch(err => {
            console.error({ err });
            if (err.response.status === 400) {
                return dispatch(setAPIFieldErrors(err.response.data.errors));
            }
            const message = err.response?.data ?? err.message;
            return dispatch(postResetCompanyFailure(message));
        });
};
