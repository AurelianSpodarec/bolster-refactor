import {
    FETCH_ALL_USERS_REQUEST,
    FETCH_ALL_USERS_SUCCESS,
    FETCH_ALL_USERS_FAILURE
} from 'constants/actionTypes/users';
import axios from 'axios';
import { ADMIN_API_URL } from 'config';
import { getHeaders } from 'helpers/api';

export const fetchAllUsersRequest = () => ({
    type: FETCH_ALL_USERS_REQUEST
});

export const fetchAllUsersSuccess = payload => ({
    type: FETCH_ALL_USERS_SUCCESS,
    payload
});

export const fetchAllUsersFailure = error => ({
    type: FETCH_ALL_USERS_FAILURE,
    error
});

export default () => dispatch => {
    dispatch(fetchAllUsersRequest());

    axios
        .get(`${ADMIN_API_URL}/users`, getHeaders())
        .then(res => dispatch(fetchAllUsersSuccess(res.data)))
        .catch(err => dispatch(fetchAllUsersFailure(err.message)));
};
