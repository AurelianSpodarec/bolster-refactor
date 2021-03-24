import axios from 'axios';

import {
    RECOVER_COMPANY_USER_REQUEST,
    RECOVER_COMPANY_USER_SUCCESS,
    RECOVER_COMPANY_USER_FAILURE,
} from 'constants/actionTypes/usersManagement';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';

export const recoverCompanyUserRequest = () => ({
    type: RECOVER_COMPANY_USER_REQUEST,
});

export const recoverCompanyUserSuccess = user => ({
    type: RECOVER_COMPANY_USER_SUCCESS,
    user,
});

export const recoverCompanyUserFailure = error => ({
    type: RECOVER_COMPANY_USER_FAILURE,
    error,
});

export default (id, user) => dispatch => {
    dispatch(recoverCompanyUserRequest());
    axios
        .delete(`${API_URL}/users/${id}?undo=true`, getHeaders())
        .then(() => dispatch(recoverCompanyUserSuccess(user)))
        .catch(err => dispatch(recoverCompanyUserFailure(err.message)));
};
