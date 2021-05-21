import axios from 'axios';

import {
    REACTIVATE_COMPANY_USER_REQUEST,
    REACTIVATE_COMPANY_USER_SUCCESS,
    REACTIVATE_COMPANY_USER_FAILURE,
} from 'constants/actionTypes/usersManagement';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';

export const reactivateCompanyUserRequest = () => ({
    type: REACTIVATE_COMPANY_USER_REQUEST,
});

export const reactivateCompanyUserSuccess = id => ({
    type: REACTIVATE_COMPANY_USER_SUCCESS,
    id,
});

export const reactivateCompanyUserFailure = error => ({
    type: REACTIVATE_COMPANY_USER_FAILURE,
    error,
});

export default id => dispatch => {
    dispatch(reactivateCompanyUserRequest());
    return axios
        .post(`${API_URL}/users/requestactiveoperativechange`, { companyUserID: id }, getHeaders())
        .then(() => dispatch(reactivateCompanyUserSuccess(id)))
        .catch(err => dispatch(reactivateCompanyUserFailure(err.message)));
};
