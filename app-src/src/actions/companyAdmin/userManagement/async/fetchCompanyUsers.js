import axios from 'axios';
import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';

import {
    FETCH_COMPANY_USERS_REQUEST,
    FETCH_COMPANY_USERS_SUCCESS,
    FETCH_COMPANY_USERS_FAILURE
} from 'constants/actionTypes/usersManagement';

export const fetchCompanyUsersRequest = () => ({
    type: FETCH_COMPANY_USERS_REQUEST
});

export const fetchCompanyUsersSuccess = payload => ({
    type: FETCH_COMPANY_USERS_SUCCESS,
    payload
});

export const fetchCompanyUsersFailure = error => ({
    type: FETCH_COMPANY_USERS_FAILURE,
    error
});

export default () => dispatch => {
    dispatch(fetchCompanyUsersRequest());

    return axios
        .get(`${API_URL}/users`, getHeaders())
        .then(res => dispatch(fetchCompanyUsersSuccess(res.data)))
        .catch(error => {
            dispatch(fetchCompanyUsersFailure(error.message));
        });
};
