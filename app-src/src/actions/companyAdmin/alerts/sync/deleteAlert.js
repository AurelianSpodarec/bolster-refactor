import axios from 'axios';

import { API_URL } from 'config';
import { getHeaders, handleErrors } from 'helpers/api';

import {
    DISMISS_ALERT_REQUEST,
    DISMISS_ALERT_SUCCESS,
    DISMISS_ALERT_FAILURE,
} from 'constants/actionTypes/alerts';

export const dismissAlertRequest = () => ({
    type: DISMISS_ALERT_REQUEST,
});

export const dismissAlertSuccess = payload => ({
    type: DISMISS_ALERT_SUCCESS,
    payload,
});

export const dismissAlertFailure = error => ({
    type: DISMISS_ALERT_FAILURE,
    error,
});

export const dismissAlert = id => async dispatch => {
    dispatch(dismissAlertRequest());

    try {
        const { data } = await axios.delete(`${API_URL}/alerts/${id}`, getHeaders());

        dispatch(dismissAlertSuccess(data));
    } catch (error) {
        dispatch(handleErrors(dismissAlertFailure(error)));
    }
};
