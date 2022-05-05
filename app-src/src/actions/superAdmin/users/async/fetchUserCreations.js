import {
    FETCH_USER_CREATIONS_REQUEST,
    FETCH_USER_CREATIONS_SUCCESS,
    FETCH_USER_CREATIONS_FAILURE,
} from 'constants/actionTypes/users';
import axios from 'axios';
import { ADMIN_API_URL } from 'config';
import { getHeaders } from 'helpers/api';

export const fetchUserCreationsRequest = () => ({
    type: FETCH_USER_CREATIONS_REQUEST,
});

export const fetchUserCreationsSuccess = payload => ({
    type: FETCH_USER_CREATIONS_SUCCESS,
    payload,
});

export const fetchUserCreationsFailure = error => ({
    type: FETCH_USER_CREATIONS_FAILURE,
    error,
});

export default (page = 1, pageSize = 50) =>
    dispatch => {
        dispatch(fetchUserCreationsRequest());

        return axios
            .get(`${ADMIN_API_URL}/users/creations?page=${page}&pageSize=${pageSize}`, getHeaders())
            .then(res => dispatch(fetchUserCreationsSuccess(res.data)))
            .catch(err => dispatch(fetchUserCreationsFailure(err.message)));
    };
