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

export default () => dispatch => {
    dispatch(fetchPinTaskSeriesMultipleRequest());

    return axios
        .get(`${API_URL}/tasks/series`, getHeaders())
        .then(res => dispatch(fetchPinTaskSeriesMultipleSuccess(res.data)))
        .catch(err => dispatch(fetchPinTaskSeriesMultipleFailure(err.message)));
};
