import axios from 'axios';

import { API_URL } from 'config/index';
import { getHeaders, handleErrors } from 'helpers/api';
import {
    CREATE_OPERATIVE_ALERT_REQUEST,
    CREATE_OPERATIVE_ALERT_SUCCESS,
    CREATE_OPERATIVE_ALERT_FAILURE
} from 'constants/actionTypes/operativeAlerts';

export const createOperativeAlertRequest = () => ({
    type: CREATE_OPERATIVE_ALERT_REQUEST
});

export const createOperativeAlertSuccess = payload => ({
    type: CREATE_OPERATIVE_ALERT_SUCCESS,
    payload
});

export const createOperativeAlertFailure = error => ({
    type: CREATE_OPERATIVE_ALERT_FAILURE,
    error
});

export default postBody => dispatch => {
    dispatch(createOperativeAlertRequest());

    axios
        .post(`${API_URL}/operativealerts`, postBody, getHeaders())
        .then(result => dispatch(createOperativeAlertSuccess(result.data)))
        .catch(err => dispatch(handleErrors(createOperativeAlertFailure)(err)));
};
