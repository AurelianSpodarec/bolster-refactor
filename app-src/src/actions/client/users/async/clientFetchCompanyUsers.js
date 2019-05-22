import axios from 'axios';
import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';

import {
    CLIENT_FETCH_COMPANY_USERS_REQUEST,
    CLIENT_FETCH_COMPANY_USERS_SUCCESS,
    CLIENT_FETCH_COMPANY_USERS_FAILURE
} from 'constants/client/actionTypes/clientCompanyUsers';

export const clientFetchCompanyUsersRequest = () => ({
    type: CLIENT_FETCH_COMPANY_USERS_REQUEST
});

export const clientFetchCompanyUsersSuccess = payload => ({
    type: CLIENT_FETCH_COMPANY_USERS_SUCCESS,
    payload
});

export const clientFetchCompanyUsersFailure = error => ({
    type: CLIENT_FETCH_COMPANY_USERS_FAILURE,
    error
});

export default () => dispatch => {
    dispatch(clientFetchCompanyUsersRequest());

    return (
        axios
            // ! change this url
            .get(`${API_URL}/users`, getHeaders())
            .then(res => dispatch(clientFetchCompanyUsersSuccess(res.data)))
            .catch(error => {
                dispatch(clientFetchCompanyUsersFailure(error.message));
            })
    );
};
