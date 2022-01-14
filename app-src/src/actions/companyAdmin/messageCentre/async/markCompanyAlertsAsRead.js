import axios from 'axios';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import {
    POST_COMPANY_ALERTS_REQUEST,
    POST_COMPANY_ALERTS_SUCCESS,
    POST_COMPANY_ALERTS_FAILURE,
} from 'constants/actionTypes/messageCentre';

export const markAlertsAsReadRequest = () => ({
    type: POST_COMPANY_ALERTS_REQUEST,
});

export const markAlertsAsReadSuccess = payload => ({
    type: POST_COMPANY_ALERTS_SUCCESS,
    payload,
});

export const markAlertsAsReadFailure = error => ({
    type: POST_COMPANY_ALERTS_FAILURE,
    error,
});

export default postBody => dispatch => {
    dispatch(markAlertsAsReadRequest());

    return axios
        .post(`${API_URL}/alertMessages/readall`, postBody, getHeaders())
        .then(res => dispatch(markAlertsAsReadSuccess(res.data)))
        .catch(err => dispatch(markAlertsAsReadFailure(err.message)));
};
