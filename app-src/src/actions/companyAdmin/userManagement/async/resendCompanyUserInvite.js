import axios from 'axios';

import {
    RESEND_COMPANY_USER_INVITE_REQUEST,
    RESEND_COMPANY_USER_INVITE_SUCCESS,
    RESEND_COMPANY_USER_INVITE_FAILURE,
} from 'constants/actionTypes/usersManagement';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';

export const resendCompanyUserInviteRequest = () => ({
    type: RESEND_COMPANY_USER_INVITE_REQUEST,
});

export const resendCompanyUserInviteSuccess = () => ({
    type: RESEND_COMPANY_USER_INVITE_SUCCESS,
});

export const resendCompanyUserInviteFailure = error => ({
    type: RESEND_COMPANY_USER_INVITE_FAILURE,
    error,
});

export default id => dispatch => {
    dispatch(resendCompanyUserInviteRequest());
    return axios
        .post(`${API_URL}/users/${id}/resendInvite`, null, getHeaders())
        .then(() => dispatch(resendCompanyUserInviteSuccess()))
        .catch(err => dispatch(resendCompanyUserInviteFailure(err.message)));
};
