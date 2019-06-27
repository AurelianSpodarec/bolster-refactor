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

export default (postBody, filterOptionsVal = 0) => dispatch => {
    dispatch(createOperativeAlertRequest());

    const endpoints = {
        [0]: '',
        [1]: 'sites',
        [2]: 'operatives'
    };

    return axios
        .post(
            `${API_URL}/operativealerts/${endpoints[filterOptionsVal]}`,
            postBody,
            getHeaders()
        )
        .then(result => dispatch(createOperativeAlertSuccess(result.data)))
        .catch(err => dispatch(handleErrors(createOperativeAlertFailure)(err)));
};
