import axios from 'axios';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import {
    FETCH_DASH_PINS_STATS_REQUEST,
    FETCH_DASH_PINS_STATS_SUCCESS,
    FETCH_DASH_PINS_STATS_FAILURE
} from 'constants/actionTypes/dashboard';

export const fetchPinStatsRequest = () => ({
    type: FETCH_DASH_PINS_STATS_REQUEST
});

export const fetchPinStatsSuccess = payload => ({
    type: FETCH_DASH_PINS_STATS_SUCCESS,
    payload
});

export const fetchPinStatsFailure = error => ({
    type: FETCH_DASH_PINS_STATS_FAILURE,
    error
});

export default () => dispatch => {
    dispatch(fetchPinStatsRequest());

    return axios
        .get(`${API_URL}/stats/dashboard`, getHeaders())
        .then(res => dispatch(fetchPinStatsSuccess(res.data)))
        .catch(err => dispatch(fetchPinStatsFailure(err.message)));
};
