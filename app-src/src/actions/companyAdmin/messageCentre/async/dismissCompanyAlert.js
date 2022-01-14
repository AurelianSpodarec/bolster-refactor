import axios from 'axios';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import {
    DISMISS_COMPANY_ALERT_REQUEST,
    DISMISS_COMPANY_ALERT_SUCCESS,
    DISMISS_COMPANY_ALERT_FAILURE,
} from 'constants/actionTypes/messageCentre';

export const dismissCompanyAlertRequest = id => ({
    type: DISMISS_COMPANY_ALERT_REQUEST,
    id,
});

export const dismissCompanyAlertSuccess = () => ({
    type: DISMISS_COMPANY_ALERT_SUCCESS,
});

export const dismissCompanyAlertFailure = (id, error) => ({
    type: DISMISS_COMPANY_ALERT_FAILURE,
    id,
    error,
});

export default id => dispatch => {
    dispatch(dismissCompanyAlertRequest(id));

    return axios
        .delete(`${API_URL}/alertMessages/${id}`, null, getHeaders())
        .then(() => dispatch(dismissCompanyAlertSuccess()))
        .catch(err => dispatch(dismissCompanyAlertFailure(id, err.message)));
};
