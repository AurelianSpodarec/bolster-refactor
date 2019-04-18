import axios from 'axios';

import { API_URL } from 'config/index';
import setAPIFieldErrors from 'actions/shared/generic/fieldErrors/sync/setAPIFieldErrors';
import { getHeaders } from 'helpers/api';
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
        .catch(error => {
            dispatch(createOperativeAlertFailure(error));
            if (error.response.status === 400)
                dispatch(setAPIFieldErrors(error.response.data.errors));
        });
};
