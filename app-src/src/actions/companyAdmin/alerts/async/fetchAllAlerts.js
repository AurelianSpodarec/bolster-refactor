import axios from 'axios';

import { API_URL } from 'config';
import { getHeaders, handleErrors } from 'helpers/api';

import {
    FETCH_ALL_ALERTS_REQUEST,
    FETCH_ALL_ALERTS_SUCCESS,
    FETCH_ALL_ALERTS_FAILURE,
} from 'constants/actionTypes/alerts';

export const fetchAllAlertsRequest = () => ({
    type: FETCH_ALL_ALERTS_REQUEST,
});

export const fetchAllAlertsSuccess = payload => ({
    type: FETCH_ALL_ALERTS_SUCCESS,
    payload,
});

export const fetchAllAlertsFailure = error => ({
    type: FETCH_ALL_ALERTS_FAILURE,
    error,
});

export const fetchAllAlerts = () => async dispatch => {
    dispatch(fetchAllAlertsRequest());

    try {
        const { data } = await axios.get(`${API_URL}/alerts`, getHeaders());

        dispatch(fetchAllAlertsSuccess(data));
    } catch (error) {
        dispatch(handleErrors(fetchAllAlertsFailure)(error));
    }
};
