import axios from 'axios';

import { API_URL } from 'config/index';
import setAPIFieldErrors from 'actions/shared/generic/fieldErrors/sync/setAPIFieldErrors';
import { getHeaders } from 'helpers/api';
import {
    EDIT_COMPANY_USER_PASSWORD_REQUEST,
    EDIT_COMPANY_USER_PASSWORD_SUCCESS,
    EDIT_COMPANY_USER_PASSWORD_FAILURE
} from 'constants/actionTypes/usersManagement';

export const editCompanyUserPasswordRequest = () => ({
    type: EDIT_COMPANY_USER_PASSWORD_REQUEST
});

export const editCompanyUserPasswordSuccess = payload => ({
    type: EDIT_COMPANY_USER_PASSWORD_SUCCESS,
    payload
});

export const editCompanyUserPasswordFailure = error => ({
    type: EDIT_COMPANY_USER_PASSWORD_FAILURE,
    error
});

export default (companyUserID, postBody) => dispatch => {
    dispatch(editCompanyUserPasswordRequest());

    return axios
        .post(
            `${API_URL}/users/${companyUserID}/password`,
            postBody,
            getHeaders()
        )
        .then(result => dispatch(editCompanyUserPasswordSuccess(result.data)))
        .catch(error => {
            dispatch(editCompanyUserPasswordFailure(error));
            if (error.response.status === 400)
                dispatch(setAPIFieldErrors(error.response.data.errors));
        });
};
