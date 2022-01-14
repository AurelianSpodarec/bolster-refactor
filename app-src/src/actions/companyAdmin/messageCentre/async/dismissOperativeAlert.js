import axios from 'axios';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import {
    DISMISS_OPERATIVE_ALERT_REQUEST,
    DISMISS_OPERATIVE_ALERT_SUCCESS,
    DISMISS_OPERATIVE_ALERT_FAILURE,
} from 'constants/actionTypes/messageCentre';

export const dismissOperativeAlertRequest = id => ({
    type: DISMISS_OPERATIVE_ALERT_REQUEST,
    id,
});

export const dismissOperativeAlertSuccess = () => ({
    type: DISMISS_OPERATIVE_ALERT_SUCCESS,
});

export const dismissOperativeAlertFailure = (id, error) => ({
    type: DISMISS_OPERATIVE_ALERT_FAILURE,
    id,
    error,
});

export default id => dispatch => {
    dispatch(dismissOperativeAlertRequest(id));

    return axios
        .delete(`${API_URL}/alertMessages/${id}`, null, getHeaders())
        .then(() => dispatch(dismissOperativeAlertSuccess()))
        .catch(err => dispatch(dismissOperativeAlertFailure(id, err.message)));
};
