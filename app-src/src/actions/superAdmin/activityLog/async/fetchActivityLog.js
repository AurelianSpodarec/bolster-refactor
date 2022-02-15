import axios from 'axios';

import {
    ADMIN_FETCH_ACTIVITY_LOG_REQUEST,
    ADMIN_FETCH_ACTIVITY_LOG_SUCCESS,
    ADMIN_FETCH_ACTIVITY_LOG_FAILURE,
} from 'constants/actionTypes/activityLog';
import { getHeaders } from 'helpers/api';
import { ADMIN_API_URL } from 'config';
import { ACTIVITY_LOG_REFERENCE_TYPES } from 'constants/companyAdmin/enums';

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

export default (type = ACTIVITY_LOG_REFERENCE_TYPES.ALL, page = 1, pageSize = 50) =>
    async dispatch => {
        dispatch(fetchAdminActivityLogRequest());

        return axios
            .get(
                `${ADMIN_API_URL}/activity?type=${type}&page=${page}&pageSize=${pageSize}`,
                getHeaders(),
            )
            .then(res => dispatch(fetchAdminActivityLogSuccess(res.data)))
            .catch(err => dispatch(fetchAdminActivityLogFailure(err.message)));
    };
