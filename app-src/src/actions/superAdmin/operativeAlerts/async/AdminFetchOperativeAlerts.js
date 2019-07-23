import axios from 'axios';

import { getHeaders } from 'helpers/api';
import {
    ADMIN_FETCH_ALL_OPERATIVE_ALERTS_REQUEST,
    ADMIN_FETCH_ALL_OPERATIVE_ALERTS_SUCCESS,
    ADMIN_FETCH_ALL_OPERATIVE_ALERTS_FAILURE
} from 'constants/actionTypes/operativeAlerts';
import { ADMIN_API_URL } from 'config';

export const fetchAllOperativeAlertsRequest = () => ({
    type: ADMIN_FETCH_ALL_OPERATIVE_ALERTS_REQUEST
});

export const fetchAllOperativeAlertsSuccess = payload => ({
    type: ADMIN_FETCH_ALL_OPERATIVE_ALERTS_SUCCESS,
    payload
});

export const fetchAllOperativeAlertsFailure = error => ({
    type: ADMIN_FETCH_ALL_OPERATIVE_ALERTS_FAILURE,
    error
});

export default () => dispatch => {
    dispatch(fetchAllOperativeAlertsRequest());

    return axios
        .get(`${ADMIN_API_URL}/operativealerts `, getHeaders())
        .then(({ data }) => dispatch(fetchAllOperativeAlertsSuccess(data)))
        .catch(err => dispatch(fetchAllOperativeAlertsFailure(err.message)));
};
