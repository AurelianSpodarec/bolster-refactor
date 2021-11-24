import axios from 'axios';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import {
    FETCH_DASH_STATS_REQUEST,
    FETCH_DASH_STATS_SUCCESS,
    FETCH_DASH_STATS_FAILURE,
} from 'constants/actionTypes/dashboard';
import moment from 'moment';

export const fetchDashStatsRequest = () => ({
    type: FETCH_DASH_STATS_REQUEST,
});

export const fetchDashStatsSuccess = payload => ({
    type: FETCH_DASH_STATS_SUCCESS,
    payload,
});

export const fetchDashStatsFailure = error => ({
    type: FETCH_DASH_STATS_FAILURE,
    error,
});

export default filterBody => dispatch => {
    dispatch(fetchDashStatsRequest());

    const convertedFilterBody = {
        ...filterBody,
        startDate: moment(filterBody.startDate).local().format('YYYY-MM-DD HH:mm'),
        endDate: moment(filterBody.endDate).local().format('YYYY-MM-DD HH:mm'),
    };
    console.log({ convertedFilterBody });
    return axios
        .post(`${API_URL}/stats/dashboard`, convertedFilterBody, getHeaders())
        .then(res => dispatch(fetchDashStatsSuccess(res.data)))
        .catch(err => dispatch(fetchDashStatsFailure(err.message)));
};
