import axios from 'axios';

import {
    REACTIVATE_COMPANY_USER_REQUEST,
    REACTIVATE_COMPANY_USER_SUCCESS,
    REACTIVATE_COMPANY_USER_FAILURE,
} from 'constants/actionTypes/usersManagement';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';

export const reactivateCompanyUserRequest = () => ({
    type: REACTIVATE_COMPANY_USER_REQUEST,
});

export const reactivateCompanyUserSuccess = user => ({
    type: REACTIVATE_COMPANY_USER_SUCCESS,
    user,
});

export const reactivateCompanyUserFailure = error => ({
    type: REACTIVATE_COMPANY_USER_FAILURE,
    error,
});

export default (id, user) => dispatch => {
    dispatch(reactivateCompanyUserRequest());
    return axios
        .post(`${API_URL}/userss/${id}`, null, getHeaders())
        .then(() => dispatch(reactivateCompanyUserSuccess(user)))
        .catch(err => dispatch(reactivateCompanyUserFailure(err.message)));
};
