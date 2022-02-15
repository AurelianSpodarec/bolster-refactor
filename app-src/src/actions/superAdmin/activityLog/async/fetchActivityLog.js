import axios from 'axios';

import {
    ADMIN_FETCH_ACTIVITY_LOG_REQUEST,
    ADMIN_FETCH_ACTIVITY_LOG_SUCCESS,
    ADMIN_FETCH_ACTIVITY_LOG_FAILURE,
} from 'constants/actionTypes/activityLog';
import { getHeaders } from 'helpers/api';
import { ADMIN_API_URL } from 'config';

export const fetchAdminActivityLogRequest = () => ({
    type: ADMIN_FETCH_ACTIVITY_LOG_REQUEST,
});

export const fetchAdminActivityLogSuccess = payload => ({
    type: ADMIN_FETCH_ACTIVITY_LOG_SUCCESS,
    payload,
});

export const fetchAdminActivityLogFailure = error => ({
    type: ADMIN_FETCH_ACTIVITY_LOG_FAILURE,
    error,
});

export default (type = '') =>
    dispatch => {
        dispatch(fetchAdminActivityLogRequest());

        return axios
            .post(`${ADMIN_API_URL}/settings/activity`, { ReferenceType: type }, getHeaders())
            .then(res => dispatch(fetchAdminActivityLogSuccess(res.data)))
            .catch(err => dispatch(fetchAdminActivityLogFailure(err.message)));
    };
