import axios from 'axios';

import {
    FETCH_ACTIVITY_LOG_REQUEST,
    FETCH_ACTIVITY_LOG_SUCCESS,
    FETCH_ACTIVITY_LOG_FAILURE,
} from 'constants/actionTypes/activityLog';
import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import { ACTIVITY_LOG_REFERENCE_TYPES } from 'constants/companyAdmin/enums';

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

export default (type = ACTIVITY_LOG_REFERENCE_TYPES.ALL, page = 1, pageSize = 50) =>
    async dispatch => {
        dispatch(fetchActivityLogRequest());

        return axios
            .get(`${API_URL}/activity?type=${type}&page=${page}&pageSize=${pageSize}`, getHeaders())
            .then(res => dispatch(fetchActivityLogSuccess(res.data)))
            .catch(err => dispatch(fetchActivityLogFailure(err.message)));
    };
