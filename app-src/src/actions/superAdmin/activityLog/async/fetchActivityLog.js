import axios from 'axios';

import {
    FETCH_ACTIVITY_LOG_REQUEST,
    FETCH_ACTIVITY_LOG_SUCCESS,
    FETCH_ACTIVITY_LOG_FAILURE,
} from 'constants/actionTypes/activityLog';
import { getHeaders } from 'helpers/api';
import { ADMIN_API_URL } from 'config';

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

export default (type = '') =>
    dispatch => {
        dispatch(fetchActivityLogRequest());

        return axios
            .post(`${ADMIN_API_URL}/settings/activity`, { ReferenceType: type }, getHeaders())
            .then(res => dispatch(fetchActivityLogSuccess(res.data)))
            .catch(err => dispatch(fetchActivityLogFailure(err.message)));
    };
