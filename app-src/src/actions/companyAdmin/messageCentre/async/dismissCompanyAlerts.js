import axios from 'axios';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import {
    DISMISS_COMPANY_ALERTS_REQUEST,
    DISMISS_COMPANY_ALERTS_SUCCESS,
    DISMISS_COMPANY_ALERTS_FAILURE,
} from 'constants/actionTypes/messageCentre';

export const dismissCompanyAlertsRequest = alertType => ({
    type: DISMISS_COMPANY_ALERTS_REQUEST,
    alertType,
});

export const dismissCompanyAlertsSuccess = () => ({
    type: DISMISS_COMPANY_ALERTS_SUCCESS,
});

export const dismissCompanyAlertsFailure = error => ({
    type: DISMISS_COMPANY_ALERTS_FAILURE,
    error,
});

export default alertType => dispatch => {
    dispatch(dismissCompanyAlertsRequest(alertType));

    return axios
        .delete(`${API_URL}/alertMessages/all`, {}, getHeaders())
        .then(() => dispatch(dismissCompanyAlertsSuccess()))
        .catch(err => {
            dispatch(dismissCompanyAlertsFailure(err));
        });
};
