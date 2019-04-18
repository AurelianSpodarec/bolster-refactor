import {
    ADMIN_FETCH_COMPANY_USERS_REQUEST,
    ADMIN_FETCH_COMPANY_USERS_SUCCESS,
    ADMIN_FETCH_COMPANY_USERS_FAILURE
} from 'constants/actionTypes/users';
import axios from 'axios';
import { ADMIN_API_URL } from 'config';
import { getHeaders } from 'helpers/api';

export const fetchCompanyUsersRequest = () => ({
    type: ADMIN_FETCH_COMPANY_USERS_REQUEST
});

export const fetchCompanyUsersSuccess = payload => ({
    type: ADMIN_FETCH_COMPANY_USERS_SUCCESS,
    payload
});

export const fetchCompanyUsersFailure = error => ({
    type: ADMIN_FETCH_COMPANY_USERS_FAILURE,
    error
});

export default companyID => dispatch => {
    dispatch(fetchCompanyUsersRequest());

    axios
        .get(`${ADMIN_API_URL}/companies/${companyID}/users`, getHeaders())
        .then(({ data }) => dispatch(fetchCompanyUsersSuccess(data)))
        .catch(err => dispatch(fetchCompanyUsersFailure(err.message)));
};
