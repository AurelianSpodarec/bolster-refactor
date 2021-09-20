import axios from 'axios';
import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';

import {
    FETCH_INACTIVE_COMPANY_USERS_REQUEST,
    FETCH_INACTIVE_COMPANY_USERS_SUCCESS,
    FETCH_INACTIVE_COMPANY_USERS_FAILURE,
} from 'constants/actionTypes/usersManagement';

export const fetchInactiveCompanyUsersRequest = () => ({
    type: FETCH_INACTIVE_COMPANY_USERS_REQUEST,
});

export const fetchInactiveCompanyUsersSuccess = payload => ({
    type: FETCH_INACTIVE_COMPANY_USERS_SUCCESS,
    payload,
});

export const fetchInactiveCompanyUsersFailure = error => ({
    type: FETCH_INACTIVE_COMPANY_USERS_FAILURE,
    error,
});

export default () => dispatch => {
    dispatch(fetchInactiveCompanyUsersRequest());

    return axios
        .get(`${API_URL}/users/nonactive`, getHeaders())
        .then(res => dispatch(fetchInactiveCompanyUsersSuccess(res.data)))
        .catch(error => {
            dispatch(fetchInactiveCompanyUsersFailure(error.message));
        });
};
