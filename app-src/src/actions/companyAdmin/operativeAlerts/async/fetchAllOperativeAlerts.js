import axios from 'axios';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import {
    FETCH_ALL_OPERATIVE_ALERTS_REQUEST,
    FETCH_ALL_OPERATIVE_ALERTS_SUCCESS,
    FETCH_ALL_OPERATIVE_ALERTS_FAILURE
} from 'constants/actionTypes/operativeAlerts';

export const fetchAllOperativeAlertsRequest = () => ({
    type: FETCH_ALL_OPERATIVE_ALERTS_REQUEST
});

export const fetchAllOperativeAlertsSuccess = payload => ({
    type: FETCH_ALL_OPERATIVE_ALERTS_SUCCESS,
    payload
});

export const fetchAllOperativeAlertsFailure = error => ({
    type: FETCH_ALL_OPERATIVE_ALERTS_FAILURE,
    error
});

export default () => dispatch => {
    dispatch(fetchAllOperativeAlertsRequest());

    axios
        .get(`${API_URL}/operativealerts `, getHeaders())
        .then(res => dispatch(fetchAllOperativeAlertsSuccess(res.data)))
        .catch(err => dispatch(fetchAllOperativeAlertsFailure(err.message)));
};
