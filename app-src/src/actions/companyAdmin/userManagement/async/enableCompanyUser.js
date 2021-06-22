import axios from 'axios';

import {
    ENABLE_COMPANY_USER_REQUEST,
    ENABLE_COMPANY_USER_SUCCESS,
    ENABLE_COMPANY_USER_FAILURE,
} from 'constants/actionTypes/usersManagement';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';

export const enableCompanyUserRequest = () => ({
    type: ENABLE_COMPANY_USER_REQUEST,
});

export const enableCompanyUserSuccess = user => ({
    type: ENABLE_COMPANY_USER_SUCCESS,
    user,
});

export const enableCompanyUserFailure = error => ({
    type: ENABLE_COMPANY_USER_FAILURE,
    error,
});

export default (id, user) => dispatch => {
    dispatch(enableCompanyUserRequest());
    return axios
        .post(`${API_URL}/users/${id}/disable?undo=true`, null, getHeaders())
        .then(() => dispatch(enableCompanyUserSuccess(user)))
        .catch(err => dispatch(enableCompanyUserFailure(err.message)));
};
