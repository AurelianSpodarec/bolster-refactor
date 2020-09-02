import axios from 'axios';

import {
    FETCH_ACTIVITY_LOG_REQUEST,
    FETCH_ACTIVITY_LOG_SUCCESS,
    FETCH_ACTIVITY_LOG_FAILURE,
} from 'constants/actionTypes/activityLog';
import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';

export const fetchActivityLogRequest = () => ({
    type: FETCH_ACTIVITY_LOG_REQUEST,
});

export const fetchActivityLogSuccess = payload => ({
    type: FETCH_ACTIVITY_LOG_SUCCESS,
    payload,
});

export const fetchActivityLogFailure = error => ({
    type: FETCH_ACTIVITY_LOG_FAILURE,
    error,
});

export default () => dispatch => {
    dispatch(fetchActivityLogRequest());

    return axios
        .get(`${API_URL}/settings/activity`, getHeaders())
        .then(res => dispatch(fetchActivityLogSuccess(res.data)))
        .catch(err => dispatch(fetchActivityLogFailure(err.message)));
};
