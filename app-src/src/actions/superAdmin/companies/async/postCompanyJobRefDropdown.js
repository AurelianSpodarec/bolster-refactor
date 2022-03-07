import axios from 'axios';

import {
    ADMIN_EDIT_COMPANY_JOB_REF_DROPDOWN_FAILURE,
    ADMIN_EDIT_COMPANY_JOB_REF_DROPDOWN_REQUEST,
    ADMIN_EDIT_COMPANY_JOB_REF_DROPDOWN_SUCCESS,
} from 'constants/actionTypes/companies';

import { ADMIN_API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import setAPIFieldErrors from 'actions/shared/generic/fieldErrors/sync/setAPIFieldErrors';

export const postEditCompanyJobRefDropdownRequest = () => ({
    type: ADMIN_EDIT_COMPANY_JOB_REF_DROPDOWN_REQUEST,
});
export const postEditCompanyJobRefDropdownSuccess = payload => ({
    type: ADMIN_EDIT_COMPANY_JOB_REF_DROPDOWN_SUCCESS,
    payload,
});
export const postEditCompanyJobRefDropdownFailure = error => ({
    type: ADMIN_EDIT_COMPANY_JOB_REF_DROPDOWN_FAILURE,
    error,
});

export default (companyID, postBody) => async dispatch => {
    dispatch(postEditCompanyJobRefDropdownRequest());
    return axios
        .patch(
            `${ADMIN_API_URL}/companies/${companyID}/jobReferenceDropdown`,
            postBody,
            getHeaders(),
        )
        .then(({ data }) => dispatch(postEditCompanyJobRefDropdownSuccess(data)))
        .catch(err => {
            dispatch(postEditCompanyJobRefDropdownFailure(err.message));
            if (err.response.status === 400) {
                dispatch(setAPIFieldErrors(err.response.data.errors));
            }
        });
};
