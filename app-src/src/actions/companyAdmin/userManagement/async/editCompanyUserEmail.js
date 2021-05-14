import axios from 'axios';

import { API_URL } from 'config/index';
import { getHeaders, handleErrors } from 'helpers/api';
import {
    EDIT_COMPANY_USER_EMAIL_REQUEST,
    EDIT_COMPANY_USER_EMAIL_SUCCESS,
    EDIT_COMPANY_USER_EMAIL_FAILURE,
} from 'constants/actionTypes/usersManagement';

export const editCompanyUserEmailRequest = () => ({
    type: EDIT_COMPANY_USER_EMAIL_REQUEST,
});

export const editCompanyUserEmailSuccess = payload => ({
    type: EDIT_COMPANY_USER_EMAIL_SUCCESS,
    payload,
});

export const editCompanyUserEmailFailure = error => ({
    type: EDIT_COMPANY_USER_EMAIL_FAILURE,
    error,
});

export default (companyUserID, postBody) => dispatch => {
    dispatch(editCompanyUserEmailRequest());

    return axios
        .post(`${API_URL}/users/${companyUserID}/email`, postBody, getHeaders())
        .then(result => dispatch(editCompanyUserEmailSuccess(result.data)))
        .catch(error => {
            dispatch(handleErrors(editCompanyUserEmailFailure)(error));
        });
};
