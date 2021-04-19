import axios from 'axios';

import {
    FETCH_RECENTLY_EXTENDED_BY_SEARCH_FAILURE,
    FETCH_RECENTLY_EXTENDED_BY_SEARCH_SUCCESS,
    FETCH_RECENTLY_EXTENDED_BY_SEARCH_REQUEST,
} from 'constants/actionTypes/recentlyExtended';
import { ADMIN_API_URL } from 'config';
import { getHeaders } from 'helpers/api';

export const fetchRecentlyExtendedDrawingsBySearchRequest = () => ({
    type: FETCH_RECENTLY_EXTENDED_BY_SEARCH_REQUEST,
});

export const fetchRecentlyExtendedDrawingsBySearchSuccess = (payload, page) => ({
    type: FETCH_RECENTLY_EXTENDED_BY_SEARCH_SUCCESS,
    payload,
    page,
});

export const fetchRecentlyExtendedDrawingsBySearchFailure = error => ({
    type: FETCH_RECENTLY_EXTENDED_BY_SEARCH_FAILURE,
    error,
});

export default (page = 1, limit = 50) => dispatch => {
    dispatch(fetchRecentlyExtendedDrawingsBySearchRequest());
    const route = '/drawings/extended/search';
    let queries = `?page=${page}&limit=${limit}`;

    return axios
        .get(`${ADMIN_API_URL}${route}${queries}`, getHeaders())
        .then(({ data }) => dispatch(fetchRecentlyExtendedDrawingsBySearchSuccess(data, page)))
        .catch(err => dispatch(fetchRecentlyExtendedDrawingsBySearchFailure(err.message)));
};
