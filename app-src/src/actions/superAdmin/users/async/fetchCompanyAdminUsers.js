import {
    FETCH_COMPANY_ADMIN_USERS_REQUEST,
    FETCH_COMPANY_ADMIN_USERS_SUCCESS,
    FETCH_COMPANY_ADMIN_USERS_FAILURE,
} from 'constants/actionTypes/users';
import axios from 'axios';
import { ADMIN_API_URL } from 'config';
import { getHeaders } from 'helpers/api';

export const fetchCompanyAdminUsersRequest = () => ({
    type: FETCH_COMPANY_ADMIN_USERS_REQUEST,
});

export const fetchCompanyAdminUsersSuccess = payload => ({
    type: FETCH_COMPANY_ADMIN_USERS_SUCCESS,
    payload,
});

export const fetchCompanyAdminUsersFailure = error => ({
    type: FETCH_COMPANY_ADMIN_USERS_FAILURE,
    error,
});

export default companyID => dispatch => {
    dispatch(fetchCompanyAdminUsersRequest());

    axios
        .get(`${ADMIN_API_URL}/companies/${companyID}/adminusers`, getHeaders())
        .then(({ data }) => {
            dispatch(fetchCompanyAdminUsersSuccess(data));
        })
        .catch(err => dispatch(fetchCompanyAdminUsersFailure(err.message)));
};
