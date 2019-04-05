import axios from 'axios';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import setAPIFieldErrors from 'actions/shared/generic/fieldErrors/sync/setAPIFieldErrors';
import {
    DELETE_COMPANY_PERMISSIONS_REQUEST,
    DELETE_COMPANY_PERMISSIONS_SUCCESS,
    DELETE_COMPANY_PERMISSIONS_FAILURE
} from 'constants/actionTypes/companies';

export const deleteCompanyRequest = () => ({
    type: DELETE_COMPANY_PERMISSIONS_REQUEST
});

export const deleteCompanySuccess = payload => ({
    type: DELETE_COMPANY_PERMISSIONS_SUCCESS,
    payload
});

export const deleteCompanyFailure = error => ({
    type: DELETE_COMPANY_PERMISSIONS_FAILURE,
    error
});

export default companyPermissionID => dispatch => {
    dispatch(deleteCompanyRequest());

    return axios
        .post(
            `${API_URL}/permissions/company/${companyPermissionID}/end`,
            getHeaders()
        )
        .then(({ data }) => dispatch(deleteCompanySuccess(data)))
        .catch(err => {
            dispatch(deleteCompanyFailure(err.message));
            if (err.response.status === 400) {
                dispatch(setAPIFieldErrors(err.response.data.errors));
            }
        });
};
