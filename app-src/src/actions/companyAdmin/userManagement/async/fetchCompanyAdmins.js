import axios from 'axios';
import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import setAPIFieldErrors from 'actions/shared/generic/fieldErrors/sync/setAPIFieldErrors';

import {
    FETCH_COMPANY_USERS_REQUEST,
    FETCH_COMPANY_USERS_SUCCESS,
    FETCH_COMPANY_USERS_FAILURE
} from 'constants/actionTypes/usersManagement';

export const fetchCompanyUsersRequest = () => ({
    type: FETCH_COMPANY_USERS_REQUEST
});

export const fetchCompanyUsersSuccess = () => ({
    type: FETCH_COMPANY_USERS_SUCCESS
});

export const fetchCompanyUsersFailure = error => ({
    type: FETCH_COMPANY_USERS_FAILURE,
    error
});

export default () => dispatch => {
    dispatch(fetchCompanyUsersRequest());

    return axios
        .get(`${API_URL}/user-management/`, getHeaders())
        .then(res => dispatch(fetchCompanyUsersSuccess(res.data)))
        .catch(error => {
            dispatch(fetchCompanyUsersFailure(error.message));
            if (error.response.status === 400) {
                dispatch(setAPIFieldErrors(error.response.data.errors));
            }
        });
};
