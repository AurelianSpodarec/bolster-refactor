import axios from 'axios';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import {
    FETCH_DASH_PIN_STATUS_STATS_REQUEST,
    FETCH_DASH_PIN_STATUS_STATS_SUCCESS,
    FETCH_DASH_PIN_STATUS_STATS_FAILURE
} from 'constants/actionTypes/dashboard';

export const fetchDashPinStatusStatsRequest = () => ({
    type: FETCH_DASH_PIN_STATUS_STATS_REQUEST
});

export const fetchDashPinStatusStatsSuccess = payload => ({
    type: FETCH_DASH_PIN_STATUS_STATS_SUCCESS,
    payload
});

export const fetchDashPinStatusStatsFailure = error => ({
    type: FETCH_DASH_PIN_STATUS_STATS_FAILURE,
    error
});

export default () => dispatch => {
    dispatch(fetchDashPinStatusStatsRequest());

    return axios
        .get(`${API_URL}/stats/all`, getHeaders())
        .then(res => dispatch(fetchDashPinStatusStatsSuccess(res.data)))
        .catch(err => dispatch(fetchDashPinStatusStatsFailure(err.message)));
};
