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

export default (companyID, postBody) => dispatch => {
    dispatch(patchCompanyOwnerRequest());
    return axios
        .patch(`${ADMIN_API_URL}/companies/${companyID}/owner`, postBody, getHeaders())
        .then(({ data }) => dispatch(patchCompanyOwnerSuccess(data)))
        .catch(err => {
            dispatch(patchCompanyOwnerFailure(err.message));
            if (err.response.status === 400) {
                dispatch(setAPIFieldErrors(err.response.data.errors));
            }
        });
};
