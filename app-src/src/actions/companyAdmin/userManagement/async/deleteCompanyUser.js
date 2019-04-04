import axios from 'axios';

import {
    DELETE_COMPANY_USER_REQUEST,
    DELETE_COMPANY_USER_SUCCESS,
    DELETE_COMPANY_USER_FAILURE
} from 'constants/actionTypes/usersManagement';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';

export const deleteCompanyUserRequest = () => ({
    type: DELETE_COMPANY_USER_REQUEST
});

export const deleteCompanyUserSuccess = id => ({
    type: DELETE_COMPANY_USER_SUCCESS,
    id
});

export const deleteCompanyUserFailure = error => ({
    type: DELETE_COMPANY_USER_FAILURE,
    error
});

export default id => dispatch => {
    dispatch(deleteCompanyUserRequest());
    axios
        .delete(`${API_URL}/users/${id}`, getHeaders())
        .then(() => dispatch(deleteCompanyUserSuccess(id)))
        .catch(err => dispatch(deleteCompanyUserFailure(err.message)));
};
