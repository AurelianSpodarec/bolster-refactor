import axios from 'axios';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import {
    POST_ALERTS_REQUEST,
    POST_ALERTS_SUCCESS,
    POST_ALERTS_FAILURE,
} from 'constants/actionTypes/messageCentre';

export const markAlertAsReadRequest = () => ({
    type: POST_ALERTS_REQUEST,
});

export const markAlertAsReadSuccess = payload => ({
    type: POST_ALERTS_SUCCESS,
    payload,
});

export const markAlertAsReadFailure = error => ({
    type: POST_ALERTS_FAILURE,
    error,
});

export const markAlertAsRead = (id, postBody) => dispatch => {
    dispatch(markAlertAsRead(id));

    return axios
        .post(`${API_URL}/alertMessages/read/${id}`, postBody, getHeaders())
        .then(res => dispatch(markAlertAsReadSuccess(res.data)))
        .catch(err => dispatch(markAlertAsReadFailure(id, err.message)));
};
