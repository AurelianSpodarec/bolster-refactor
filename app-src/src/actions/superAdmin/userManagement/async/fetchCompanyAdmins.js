import axios from 'axios';
import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import setAPIFieldErrors from 'actions/generic/fieldErrors/sync/setAPIFieldErrors';

import {
    FETCH_COMPANY_ADMINS_REQUEST,
    FETCH_COMPANY_ADMINS_SUCCESS,
    FETCH_COMPANY_ADMINS_FAILURE
} from 'constants/actionTypes';

export const fetchCompanyAdminsRequest = () => ({
    type: FETCH_COMPANY_ADMINS_REQUEST
});

export const fetchCompanyAdminsSuccess = () => ({
    type: FETCH_COMPANY_ADMINS_SUCCESS
});

export const fetchCompanyAdminsFailure = error => ({
    type: FETCH_COMPANY_ADMINS_FAILURE,
    error
});

export default () => dispatch => {
    dispatch(fetchCompanyAdminsRequest());

    return axios
        .get(`${API_URL}/user-management/`, getHeaders())
        .then(res => dispatch(fetchCompanyAdminsSuccess(res.data)))
        .catch(error => {
            dispatch(fetchCompanyAdminsFailure(error.message));
            if (error.response.status === 400) {
                dispatch(setAPIFieldErrors(error.response.data.errors));
            }
        });
};
