import axios from 'axios';

import { API_URL } from 'config/index';
import setAPIFieldErrors from 'actions/shared/generic/fieldErrors/sync/setAPIFieldErrors';
import { getHeaders } from 'helpers/api';
import {
    EDIT_COMPANY_USER_TYPE_REQUEST,
    EDIT_COMPANY_USER_TYPE_SUCCESS,
    EDIT_COMPANY_USER_TYPE_FAILURE
} from 'constants/actionTypes/usersManagement';

export const editCompanyUserTypeRequest = () => ({
    type: EDIT_COMPANY_USER_TYPE_REQUEST
});

export const editCompanyUserTypeSuccess = payload => ({
    type: EDIT_COMPANY_USER_TYPE_SUCCESS,
    payload
});

export const editCompanyUserTypeFailure = error => ({
    type: EDIT_COMPANY_USER_TYPE_FAILURE,
    error
});

export default (companyUserID, postBody) => dispatch => {
    dispatch(editCompanyUserTypeRequest());

    return axios
        .post(
            `${API_URL}/users/${companyUserID}/changetype`,
            postBody,
            getHeaders()
        )
        .then(result => dispatch(editCompanyUserTypeSuccess(result.data)))
        .catch(error => {
            dispatch(editCompanyUserTypeFailure(error));
            if (error.response.status === 400)
                dispatch(setAPIFieldErrors(error.response.data.errors));
        });
};
