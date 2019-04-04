import axios from 'axios';

import { API_URL } from 'config/index';
import setAPIFieldErrors from 'actions/shared/generic/fieldErrors/sync/setAPIFieldErrors';
import { getHeaders } from 'helpers/api';
import {
    EDIT_COMPANY_USER_REQUEST,
    EDIT_COMPANY_USER_SUCCESS,
    EDIT_COMPANY_USER_FAILURE
} from 'constants/actionTypes/usersManagement';

export const editCompanyUserRequest = () => ({
    type: EDIT_COMPANY_USER_REQUEST
});

export const editCompanyUserSuccess = payload => ({
    type: EDIT_COMPANY_USER_SUCCESS,
    payload
});

export const editCompanyUserFailure = error => ({
    type: EDIT_COMPANY_USER_FAILURE,
    error
});

export default (companyUserID, postBody) => dispatch => {
    dispatch(editCompanyUserRequest());

    return axios
        .post(`${API_URL}/users/${companyUserID}`, postBody, getHeaders())
        .then(result => dispatch(editCompanyUserSuccess(result.data)))
        .catch(error => {
            dispatch(editCompanyUserFailure(error));
            if (error.response.status === 400)
                dispatch(setAPIFieldErrors(error.response.data.errors));
        });
};
