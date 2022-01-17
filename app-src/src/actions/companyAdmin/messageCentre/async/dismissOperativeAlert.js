import axios from 'axios';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import {
    DISMISS_OPERATIVE_ALERT_REQUEST,
    DISMISS_OPERATIVE_ALERT_SUCCESS,
    DISMISS_OPERATIVE_ALERT_FAILURE,
} from 'constants/actionTypes/messageCentre';

export const dismissOperativeAlertRequest = () => ({
    type: DISMISS_OPERATIVE_ALERT_REQUEST,
});

export const dismissOperativeAlertSuccess = payload => ({
    type: DISMISS_OPERATIVE_ALERT_SUCCESS,
    payload,
});

export const dismissOperativeAlertFailure = error => ({
    type: DISMISS_OPERATIVE_ALERT_FAILURE,
    error,
});

export default id => dispatch => {
    dispatch(dismissOperativeAlertRequest());

    return axios
        .delete(`${API_URL}/alertMessages/${id}`, getHeaders())
        .then(() => dispatch(dismissOperativeAlertSuccess(id)))
        .catch(err => dispatch(dismissOperativeAlertFailure(id, err.message)));
};
