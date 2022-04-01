import axios from 'axios';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import {
    DISMISS_COMPANY_ALERT_REQUEST,
    DISMISS_COMPANY_ALERT_SUCCESS,
    DISMISS_COMPANY_ALERT_FAILURE,
} from 'constants/actionTypes/messageCentre';

export const dismissCompanyAlertRequest = () => ({
    type: DISMISS_COMPANY_ALERT_REQUEST,
});

export const dismissCompanyAlertSuccess = payload => ({
    type: DISMISS_COMPANY_ALERT_SUCCESS,
    payload,
});

export const dismissCompanyAlertFailure = error => ({
    type: DISMISS_COMPANY_ALERT_FAILURE,
    error,
});

export default id => dispatch => {
    dispatch(dismissCompanyAlertRequest());

    return axios
        .delete(`${API_URL}/alertMessages/${id}`, getHeaders())
        .then(() => dispatch(dismissCompanyAlertSuccess(id)))
        .catch(err => dispatch(dismissCompanyAlertFailure(id, err.message)));
};
