import axios from 'axios';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import {
    DISMISS_ALERTS_REQUEST,
    DISMISS_ALERTS_SUCCESS,
    DISMISS_ALERTS_FAILURE,
} from 'constants/actionTypes/messageCentre';

export const dismissAlertsRequest = alertType => ({
    type: DISMISS_ALERTS_REQUEST,
    alertType,
});

export const dismissAlertsSuccess = () => ({
    type: DISMISS_ALERTS_SUCCESS,
});

export const dismissAlertsFailure = error => ({
    type: DISMISS_ALERTS_FAILURE,
    error,
});

export default alertType => dispatch => {
    dispatch(dismissAlertsRequest(alertType));

    return axios
        .delete(`${API_URL}/alertMessages/all/${alertType}`, null, getHeaders())
        .then(() => dispatch(dismissAlertsSuccess()))
        .catch(err => {
            dispatch(dismissAlertsFailure(err));
        });
};
