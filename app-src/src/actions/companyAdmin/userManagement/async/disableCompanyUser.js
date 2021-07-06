import axios from 'axios';

import {
    DISABLE_COMPANY_USER_REQUEST,
    DISABLE_COMPANY_USER_SUCCESS,
    DISABLE_COMPANY_USER_FAILURE,
} from 'constants/actionTypes/usersManagement';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';

export const disableCompanyUserRequest = () => ({
    type: DISABLE_COMPANY_USER_REQUEST,
});

export const disableCompanyUserSuccess = user => ({
    type: DISABLE_COMPANY_USER_SUCCESS,
    user,
});

export const disableCompanyUserFailure = error => ({
    type: DISABLE_COMPANY_USER_FAILURE,
    error,
});

export default (id, user) => dispatch => {
    dispatch(disableCompanyUserRequest());
    return axios
        .post(`${API_URL}/users/${id}/disable`, null, getHeaders())
        .then(() => dispatch(disableCompanyUserSuccess(user)))
        .catch(err => dispatch(disableCompanyUserFailure(err.message)));
};
