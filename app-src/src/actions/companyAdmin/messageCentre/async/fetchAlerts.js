import axios from 'axios';

import { API_URL } from 'config';
import {
    FETCH_ALERTS_REQUEST,
    FETCH_ALERTS_SUCCESS,
    FETCH_ALERTS_FAILURE,
} from 'constants/actionTypes/messageCentre';
import { getHeaders } from 'helpers/api';

export const fetchAlertsRequest = () => ({
    type: FETCH_ALERTS_REQUEST,
});

export const fetchAlertsSuccess = payload => ({
    type: FETCH_ALERTS_SUCCESS,
    payload,
});

export const fetchAlertsFailure = error => ({
    type: FETCH_ALERTS_FAILURE,
    error,
});

export default () => dispatch => {
    dispatch(fetchAlertsRequest());

    axios
        .get(`${API_URL}/alertMessages`, getHeaders())
        .then(res => dispatch(fetchAlertsSuccess(res.data)))
        .catch(err => dispatch(fetchAlertsFailure(err.message)));
};
