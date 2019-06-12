import axios from 'axios';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import {
    FETCH_DASH_STATS_REQUEST,
    FETCH_DASH_STATS_SUCCESS,
    FETCH_DASH_STATS_FAILURE
} from 'constants/actionTypes/dashboard';

export const fetchDashStatsRequest = () => ({
    type: FETCH_DASH_STATS_REQUEST
});

export const fetchDashStatsSuccess = payload => ({
    type: FETCH_DASH_STATS_SUCCESS,
    payload
});

export const fetchDashStatsFailure = error => ({
    type: FETCH_DASH_STATS_FAILURE,
    error
});

export default () => dispatch => {
    dispatch(fetchDashStatsRequest());

    return axios
        .get(`${API_URL}/stats/dashboard`, getHeaders())
        .then(res => dispatch(fetchDashStatsSuccess(res.data)))
        .catch(err => dispatch(fetchDashStatsFailure(err.message)));
};
