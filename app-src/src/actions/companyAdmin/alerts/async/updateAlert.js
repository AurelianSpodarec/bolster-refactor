import axios from 'axios';

import { API_URL } from 'config';
import { getHeaders, handleErrors } from 'helpers/api';

import {
    UPDATE_ALERT_REQUEST,
    UPDATE_ALERT_SUCCESS,
    UPDATE_ALERT_FAILURE,
} from 'constants/actionTypes/alerts';

export const updateAlertRequest = () => ({
    type: UPDATE_ALERT_REQUEST,
});

export const updateAlertSuccess = payload => ({
    type: UPDATE_ALERT_SUCCESS,
    payload,
});

export const updateAlertFailure = error => ({
    type: UPDATE_ALERT_FAILURE,
    error,
});

export default (id, postBody) => async dispatch => {
    dispatch(updateAlertRequest());

    try {
        const { data } = await axios.patch(`${API_URL}/alerts/${id}`, postBody, getHeaders());

        dispatch(updateAlertSuccess(data));
    } catch (error) {
        dispatch(handleErrors(updateAlertFailure)(error));
    }
};
