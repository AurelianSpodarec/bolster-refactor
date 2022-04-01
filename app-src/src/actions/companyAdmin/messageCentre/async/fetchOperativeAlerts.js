import axios from 'axios';

import { API_URL } from 'config';
import {
    FETCH_OPERATIVE_ALERTS_REQUEST,
    FETCH_OPERATIVE_ALERTS_SUCCESS,
    FETCH_OPERATIVE_ALERTS_FAILURE,
} from 'constants/actionTypes/messageCentre';
import { getHeaders } from 'helpers/api';

export const fetchOperativeAlertsRequest = () => ({
    type: FETCH_OPERATIVE_ALERTS_REQUEST,
});

export const fetchOperativeAlertsSuccess = payload => ({
    type: FETCH_OPERATIVE_ALERTS_SUCCESS,
    payload,
});

export const fetchOperativeAlertsFailure = error => ({
    type: FETCH_OPERATIVE_ALERTS_FAILURE,
    error,
});

export default () => dispatch => {
    dispatch(fetchOperativeAlertsRequest());

    axios
        .get(`${API_URL}/operativeAlerts`, getHeaders())
        .then(res => dispatch(fetchOperativeAlertsSuccess(res.data)))
        .catch(err => dispatch(fetchOperativeAlertsFailure(err.message)));
};
