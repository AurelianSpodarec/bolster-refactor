import axios from 'axios';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import {
    FETCH_OPERATIVE_ALERT_DELIVERIES_REQUEST,
    FETCH_OPERATIVE_ALERT_DELIVERIES_SUCCESS,
    FETCH_OPERATIVE_ALERT_DELIVERIES_FAILURE
} from 'constants/actionTypes/operativeAlerts';

export const fetchOperativeAlertDeliveriesRequest = () => ({
    type: FETCH_OPERATIVE_ALERT_DELIVERIES_REQUEST
});

export const fetchOperativeAlertDeliveriesSuccess = payload => ({
    type: FETCH_OPERATIVE_ALERT_DELIVERIES_SUCCESS,
    payload
});

export const fetchOperativeAlertDeliveriesFailure = error => ({
    type: FETCH_OPERATIVE_ALERT_DELIVERIES_FAILURE,
    error
});

export default alertID => dispatch => {
    dispatch(fetchOperativeAlertDeliveriesRequest());

    axios
        .get(`${API_URL}/operativealerts/${alertID}/deliveries`, getHeaders())
        .then(({ data }) =>
            dispatch(fetchOperativeAlertDeliveriesSuccess(data))
        )
        .catch(err =>
            dispatch(fetchOperativeAlertDeliveriesFailure(err.message))
        );
};
