import axios from 'axios';
import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';

import {
    FETCH_CLIENT_USERS_REQUEST,
    FETCH_CLIENT_USERS_SUCCESS,
    FETCH_CLIENT_USERS_FAILURE
} from 'constants/actionTypes/usersManagement';

export const fetchClientUsersRequest = () => ({
    type: FETCH_CLIENT_USERS_REQUEST
});

export const fetchClientUsersSuccess = payload => ({
    type: FETCH_CLIENT_USERS_SUCCESS,
    payload
});

export const fetchClientUsersFailure = error => ({
    type: FETCH_CLIENT_USERS_FAILURE,
    error
});

export default () => dispatch => {
    dispatch(fetchClientUsersRequest());

    return axios
        .get(`${API_URL}/clientpermissions`, getHeaders())
        .then(res => dispatch(fetchClientUsersSuccess(res.data)))
        .catch(error => {
            dispatch(fetchClientUsersFailure(error.message));
        });
};
