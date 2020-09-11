import axios from 'axios';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import {
    FETCH_RECENT_UPDATES_REQUEST,
    FETCH_RECENT_UPDATES_SUCCESS,
    FETCH_RECENT_UPDATES_FAILURE,
} from 'constants/actionTypes/recentUpdates';

export const fetchRecentUpdatesRequest = () => ({
    type: FETCH_RECENT_UPDATES_REQUEST,
});

export const fetchRecentUpdatesSuccess = payload => ({
    type: FETCH_RECENT_UPDATES_SUCCESS,
    payload,
});

export const fetchRecentUpdatesFailure = error => ({
    type: FETCH_RECENT_UPDATES_FAILURE,
    error,
});

export default () => dispatch => {
    dispatch(fetchRecentUpdatesRequest());

    axios
        .get(`${API_URL}/users/recentupdates`, getHeaders())
        .then(res => dispatch(fetchRecentUpdatesSuccess(res.data)))
        .catch(err => dispatch(fetchRecentUpdatesFailure(err.message)));
};
