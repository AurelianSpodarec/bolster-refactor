import axios from 'axios';

import {
    ADMIN_EDIT_COMPANY_OWNER_FAILURE,
    ADMIN_EDIT_COMPANY_OWNER_REQUEST,
    ADMIN_EDIT_COMPANY_OWNER_SUCCESS,
} from 'constants/actionTypes/companies';

import { ADMIN_API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import setAPIFieldErrors from 'actions/shared/generic/fieldErrors/sync/setAPIFieldErrors';

export const patchCompanyOwnerRequest = () => ({
    type: ADMIN_EDIT_COMPANY_OWNER_REQUEST,
});
export const patchCompanyOwnerSuccess = payload => ({
    type: ADMIN_EDIT_COMPANY_OWNER_SUCCESS,
    payload,
});
export const patchCompanyOwnerFailure = error => ({
    type: ADMIN_EDIT_COMPANY_OWNER_FAILURE,
    error,
});

export default companyUserID => dispatch => {
    dispatch(patchCompanyOwnerRequest());
    return axios
        .post(`${ADMIN_API_URL}/users/owner`, { companyUserID }, getHeaders())
        .then(() => dispatch(patchCompanyOwnerSuccess(companyUserID)))
        .catch(err => {
            dispatch(patchCompanyOwnerFailure(err.message));
            if (err.response.status === 400) {
                dispatch(setAPIFieldErrors(err.response.data.errors));
            }
        });
};
