import axios from 'axios';

import { getHeaders, handleErrors } from 'helpers/api';
import {
    ADMIN_CREATE_OPERATIVE_ALERT_REQUEST,
    ADMIN_CREATE_OPERATIVE_ALERT_SUCCESS,
    ADMIN_CREATE_OPERATIVE_ALERT_FAILURE
} from 'constants/actionTypes/operativeAlerts';

import { ADMIN_API_URL } from 'config';

export const createOperativeAlertRequest = () => ({
    type: ADMIN_CREATE_OPERATIVE_ALERT_REQUEST
});

export const createOperativeAlertSuccess = payload => ({
    type: ADMIN_CREATE_OPERATIVE_ALERT_SUCCESS,
    payload
});

export const createOperativeAlertFailure = error => ({
    type: ADMIN_CREATE_OPERATIVE_ALERT_FAILURE,
    error
});

export default postBody => dispatch => {
    dispatch(createOperativeAlertRequest());
    return axios
        .post(`${ADMIN_API_URL}/operativealerts`, postBody, getHeaders())
        .then(({ data }) => dispatch(createOperativeAlertSuccess(data)))
        .catch(err => dispatch(handleErrors(createOperativeAlertFailure)(err)));
};
