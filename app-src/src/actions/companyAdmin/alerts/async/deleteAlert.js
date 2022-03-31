import axios from 'axios';

import { API_URL } from 'config';
import { getHeaders, handleErrors } from 'helpers/api';

import {
    DELETE_ALERT_REQUEST,
    DELETE_ALERT_SUCCESS,
    DELETE_ALERT_FAILURE,
} from 'constants/actionTypes/alerts';

export const deleteAlertRequest = () => ({
    type: DELETE_ALERT_REQUEST,
});

export const deleteAlertSuccess = payload => ({
    type: DELETE_ALERT_SUCCESS,
    payload,
});

export const deleteAlertFailure = error => ({
    type: DELETE_ALERT_FAILURE,
    error,
});

export default id => async dispatch => {
    dispatch(deleteAlertRequest());

    try {
        await axios.delete(`${API_URL}/alerts/${id}`, getHeaders());

        dispatch(deleteAlertSuccess(id));
    } catch (error) {
        dispatch(handleErrors(deleteAlertFailure)(error));
    }
};
