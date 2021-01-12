import axios from 'axios';

import {
    ADMIN_FETCH_RECENTLY_EXTENDED_REQUEST,
    ADMIN_FETCH_RECENTLY_EXTENDED_SUCCESS,
    ADMIN_FETCH_RECENTLY_EXTENDED_FAILURE,
} from 'constants/actionTypes/recentlyExtended';
import { ADMIN_API_URL } from 'config';
import { getHeaders } from 'helpers/api';

export const fetchRecentlyExtendedRequest = () => ({
    type: ADMIN_FETCH_RECENTLY_EXTENDED_REQUEST,
});

export const fetchRecentlyExtendedSuccess = payload => ({
    type: ADMIN_FETCH_RECENTLY_EXTENDED_SUCCESS,
    payload,
});

export const fetchRecentlyExtendedFailure = error => ({
    type: ADMIN_FETCH_RECENTLY_EXTENDED_FAILURE,
    error,
});

export default () => dispatch => {
    dispatch(fetchRecentlyExtendedRequest());

    return axios
        .get(`${ADMIN_API_URL}/drawings/extend`, getHeaders())
        .then(({ data }) => dispatch(fetchRecentlyExtendedSuccess(data)))
        .catch(err => dispatch(fetchRecentlyExtendedFailure(err.message)));
};
