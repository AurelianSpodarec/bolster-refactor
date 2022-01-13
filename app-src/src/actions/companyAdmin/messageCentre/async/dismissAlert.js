import axios from 'axios';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import {
    DISMISS_ALERT_REQUEST,
    DISMISS_ALERT_SUCCESS,
    DISMISS_ALERT_FAILURE,
} from 'constants/actionTypes/messageCentre';

export const dismissAlertRequest = id => ({
    type: DISMISS_ALERT_REQUEST,
    id,
});

export const dismissAlertSuccess = () => ({
    type: DISMISS_ALERT_SUCCESS,
});

export const dismissAlertFailure = (id, error) => ({
    type: DISMISS_ALERT_FAILURE,
    id,
    error,
});

export default id => dispatch => {
    dispatch(dismissAlertRequest(id));

    return axios
        .delete(`${API_URL}/alertMessages/${id}`, null, getHeaders())
        .then(() => dispatch(dismissAlertSuccess()))
        .catch(err => dispatch(dismissAlertFailure(id, err.message)));
};
