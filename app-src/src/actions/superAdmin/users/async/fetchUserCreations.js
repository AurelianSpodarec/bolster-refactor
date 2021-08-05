import {
    FETCH_USER_CREATIONS_REQUEST,
    FETCH_USER_CREATIONS_SUCCESS,
    FETCH_USER_CREATIONS_FAILURE,
} from 'constants/actionTypes/users';
import axios from 'axios';
import { ADMIN_API_URL } from 'config';
import { getHeaders } from 'helpers/api';

export const fetchAllUsersRequest = () => ({
    type: FETCH_USER_CREATIONS_REQUEST,
});

export const fetchAllUsersSuccess = payload => ({
    type: FETCH_USER_CREATIONS_SUCCESS,
    payload,
});

export const fetchAllUsersFailure = error => ({
    type: FETCH_USER_CREATIONS_FAILURE,
    error,
});

export default () => dispatch => {
    dispatch(fetchAllUsersRequest());

    return axios
        .get(`${ADMIN_API_URL}/users/creations`, getHeaders())
        .then(res => dispatch(fetchAllUsersSuccess(res.data)))
        .catch(err => dispatch(fetchAllUsersFailure(err.message)));
};
