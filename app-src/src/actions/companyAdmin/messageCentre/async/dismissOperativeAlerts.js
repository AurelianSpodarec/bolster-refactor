import axios from 'axios';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import {
    DISMISS_OPERATIVE_ALERTS_REQUEST,
    DISMISS_OPERATIVE_ALERTS_SUCCESS,
    DISMISS_OPERATIVE_ALERTS_FAILURE,
} from 'constants/actionTypes/messageCentre';

export const dismissOperativeAlertsRequest = () => ({
    type: DISMISS_OPERATIVE_ALERTS_REQUEST,
});

export const dismissOperativeAlertsSuccess = () => ({
    type: DISMISS_OPERATIVE_ALERTS_SUCCESS,
});

export const dismissOperativeAlertsFailure = error => ({
    type: DISMISS_OPERATIVE_ALERTS_FAILURE,
    error,
});

export default () => dispatch => {
    dispatch(dismissOperativeAlertsRequest());

    return axios
        .delete(`${API_URL}/alertMessages/all`, {}, getHeaders())
        .then(() => dispatch(dismissOperativeAlertsSuccess()))
        .catch(err => {
            dispatch(dismissOperativeAlertsFailure(err));
        });
};
