import axios from 'axios';

import { API_URL } from 'config';
import {
    FETCH_PIN_TASK_SERIES_MULTIPLE_FAILURE,
    FETCH_PIN_TASK_SERIES_MULTIPLE_REQUEST,
    FETCH_PIN_TASK_SERIES_MULTIPLE_SUCCESS,
} from 'constants/actionTypes/pinTasks';
import { getHeaders } from 'helpers/api';

export const fetchPinTaskSeriesMultipleRequest = () => ({
    type: FETCH_PIN_TASK_SERIES_MULTIPLE_REQUEST,
});

export const fetchPinTaskSeriesMultipleSuccess = payload => ({
    type: FETCH_PIN_TASK_SERIES_MULTIPLE_SUCCESS,
    payload,
});

export const fetchPinTaskSeriesMultipleFailure = error => ({
    type: FETCH_PIN_TASK_SERIES_MULTIPLE_FAILURE,
    error,
});

export default (from, to) => dispatch => {
    dispatch(fetchPinTaskSeriesMultipleRequest());

    return axios
        .post(`${API_URL}/tasks/series`, { from, to }, getHeaders())
        .then(res => dispatch(fetchPinTaskSeriesMultipleSuccess(res.data)))
        .catch(err => dispatch(fetchPinTaskSeriesMultipleFailure(err.message)));
};
