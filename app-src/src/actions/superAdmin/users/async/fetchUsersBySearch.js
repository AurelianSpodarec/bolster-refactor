import axios from 'axios';

import {
    ADMIN_FETCH_USERS_BY_SEARCH_FAILURE,
    ADMIN_FETCH_USERS_BY_SEARCH_SUCCESS,
    ADMIN_FETCH_USERS_BY_SEARCH_REQUEST,
} from 'constants/actionTypes/users';
import { ADMIN_API_URL } from 'config';
import { getHeaders } from 'helpers/api';

export const fetchUsersBySearchRequest = () => ({
    type: ADMIN_FETCH_USERS_BY_SEARCH_REQUEST,
});

export const fetchUsersBySearchSuccess = (payload, page) => ({
    type: ADMIN_FETCH_USERS_BY_SEARCH_SUCCESS,
    payload,
    page,
});

export const fetchUsersBySearchFailure = error => ({
    type: ADMIN_FETCH_USERS_BY_SEARCH_FAILURE,
    error,
});

export default (page = 1, searchTerm, role, limit = 50) => dispatch => {
    dispatch(fetchUsersBySearchRequest());
    const route = '/users/search';
    let queries = `?page=${page}&limit=${limit}`;
    if (searchTerm) queries += `&searchTerm=${searchTerm}`;
    if (role !== undefined) queries += `&role=${role}`;
    return axios
        .get(`${ADMIN_API_URL}${route}${queries}`, getHeaders())
        .then(({ data }) => dispatch(fetchUsersBySearchSuccess(data, page)))
        .catch(err => dispatch(fetchUsersBySearchFailure(err.message)));
};
