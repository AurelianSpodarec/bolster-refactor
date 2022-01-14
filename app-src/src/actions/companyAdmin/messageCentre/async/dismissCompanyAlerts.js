import axios from 'axios';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import {
    DISMISS_COMPANY_ALERTS_REQUEST,
    DISMISS_COMPANY_ALERTS_SUCCESS,
    DISMISS_COMPANY_ALERTS_FAILURE,
} from 'constants/actionTypes/messageCentre';

export const dismissCompanyAlertsRequest = () => ({
    type: DISMISS_COMPANY_ALERTS_REQUEST,
});

export const dismissCompanyAlertsSuccess = () => ({
    type: DISMISS_COMPANY_ALERTS_SUCCESS,
});

export const dismissCompanyAlertsFailure = error => ({
    type: DISMISS_COMPANY_ALERTS_FAILURE,
    error,
});

export default () => dispatch => {
    dispatch(dismissCompanyAlertsRequest());

    return axios
        .delete(`${API_URL}/alertMessages/all`, {}, getHeaders())
        .then(() => dispatch(dismissCompanyAlertsSuccess()))
        .catch(err => {
            dispatch(dismissCompanyAlertsFailure(err));
        });
};
