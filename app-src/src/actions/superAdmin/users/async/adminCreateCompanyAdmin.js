import axios from 'axios';

import {
    ADMIN_CREATE_COMPANY_USER_REQUEST,
    ADMIN_CREATE_COMPANY_USER_SUCCESS,
    ADMIN_CREATE_COMPANY_USER_FAILURE,
} from 'constants/actionTypes/usersManagement';

import { ADMIN_API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import setAPIFieldErrors from 'actions/shared/generic/fieldErrors/sync/setAPIFieldErrors';

export const adminCreateCompanyAdminRequest = () => ({
    type: ADMIN_CREATE_COMPANY_USER_REQUEST,
});
export const adminCreateCompanyAdminSuccess = payload => ({
    type: ADMIN_CREATE_COMPANY_USER_SUCCESS,
    payload,
});
export const adminCreateCompanyAdminFailure = error => ({
    type: ADMIN_CREATE_COMPANY_USER_FAILURE,
    error,
});

export default postBody => dispatch => {
    dispatch(adminCreateCompanyAdminRequest());
    return axios
        .post(`${ADMIN_API_URL}/users/company`, postBody, getHeaders())
        .then(({ data }) => dispatch(adminCreateCompanyAdminSuccess(data)))
        .catch(err => {
            dispatch(adminCreateCompanyAdminFailure(err.message));
            if (err.response.status === 400) {
                dispatch(setAPIFieldErrors(err.response.data.errors));
            }
        });
};
