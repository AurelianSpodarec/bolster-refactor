import axios from 'axios';

import {
    FETCH_RECENTLY_EXTENDED_COUNT_REQUEST,
    FETCH_RECENTLY_EXTENDED_COUNT_SUCCESS,
    FETCH_RECENTLY_EXTENDED_COUNT_FAILURE,
} from 'constants/actionTypes/recentlyExtended';

import { ADMIN_API_URL } from 'config';
import { getHeaders } from 'helpers/api';

export const fetchRecentlyExtendedCountRequest = () => ({
    type: FETCH_RECENTLY_EXTENDED_COUNT_REQUEST,
});

export const fetchRecentlyExtendedCountSuccess = payload => ({
    type: FETCH_RECENTLY_EXTENDED_COUNT_SUCCESS,
    payload,
});

export const fetchRecentlyExtendedCountFailure = error => ({
    type: FETCH_RECENTLY_EXTENDED_COUNT_FAILURE,
    error,
});

export default () => dispatch => {
    dispatch(fetchRecentlyExtendedCountRequest());

    return axios
        .get(`${ADMIN_API_URL}/drawings/extended/count`, getHeaders())
        .then(({ data }) => dispatch(fetchRecentlyExtendedCountSuccess(data)))
        .catch(err => dispatch(fetchRecentlyExtendedCountFailure(err.message)));
};
