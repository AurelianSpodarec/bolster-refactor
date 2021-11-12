import axios from 'axios';

import {
    DELETE_COMPANY_USER_INVITE_REQUEST,
    DELETE_COMPANY_USER_INVITE_SUCCESS,
    DELETE_COMPANY_USER_INVITE_FAILURE,
} from 'constants/actionTypes/usersManagement';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';

export const deleteCompanyUserInviteRequest = () => ({
    type: DELETE_COMPANY_USER_INVITE_REQUEST,
});

export const deleteCompanyUserInviteSuccess = payload => ({
    type: DELETE_COMPANY_USER_INVITE_SUCCESS,
    payload,
});

export const deleteCompanyUserInviteFailure = error => ({
    type: DELETE_COMPANY_USER_INVITE_FAILURE,
    error,
});

export default (id, user) => dispatch => {
    dispatch(deleteCompanyUserInviteRequest());
    axios
        .post(`${API_URL}/users/${id}/cancelInvite`, {}, getHeaders())
        .then(() => dispatch(deleteCompanyUserInviteSuccess(user)))
        .catch(err => dispatch(deleteCompanyUserInviteFailure(err.message)));
};
