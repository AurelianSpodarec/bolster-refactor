import axios from 'axios';

import {
    FETCH_RECENTLY_EXTENDED_BY_PAGE_FAILURE,
    FETCH_RECENTLY_EXTENDED_BY_PAGE_SUCCESS,
    FETCH_RECENTLY_EXTENDED_BY_PAGE_REQUEST,
} from 'constants/actionTypes/recentlyExtended';
import { ADMIN_API_URL } from 'config';
import { getHeaders } from 'helpers/api';

export const fetchRecentlyExtendedDrawingsByPageRequest = () => ({
    type: FETCH_RECENTLY_EXTENDED_BY_PAGE_REQUEST,
});

export const fetchRecentlyExtendedDrawingsByPageSuccess = (payload, page) => ({
    type: FETCH_RECENTLY_EXTENDED_BY_PAGE_SUCCESS,
    payload,
    page,
});

export const fetchRecentlyExtendedDrawingsByPageFailure = error => ({
    type: FETCH_RECENTLY_EXTENDED_BY_PAGE_FAILURE,
    error,
});

export default (page = 1, limit = 50) =>
    dispatch => {
        dispatch(fetchRecentlyExtendedDrawingsByPageRequest());
        const route = '/drawings/extend';
        let queries = `?page=${page}&limit=${limit}`;

        return axios
            .get(`${ADMIN_API_URL}${route}${queries}`, getHeaders())
            .then(({ data }) => dispatch(fetchRecentlyExtendedDrawingsByPageSuccess(data, page)))
            .catch(err => dispatch(fetchRecentlyExtendedDrawingsByPageFailure(err.message)));
    };
