import axios from 'axios';

import { API_URL } from 'config';
import {
    FETCH_PIN_TASK_SERIES_FAILURE,
    FETCH_PIN_TASK_SERIES_REQUEST,
    FETCH_PIN_TASK_SERIES_SUCCESS,
} from 'constants/actionTypes/pinTasks';
import { getHeaders } from 'helpers/api';

export const fetchPinTaskSeriesRequest = () => ({
    type: FETCH_PIN_TASK_SERIES_REQUEST,
});

export const fetchPinTaskSeriesSuccess = payload => ({
    type: FETCH_PIN_TASK_SERIES_SUCCESS,
    payload,
});

export const fetchPinTaskSeriesFailure = error => ({
    type: FETCH_PIN_TASK_SERIES_FAILURE,
    error,
});

export default id => dispatch => {
    dispatch(fetchPinTaskSeriesRequest());

    return axios
        .get(`${API_URL}/tasks/series/${id}`, getHeaders())
        .then(res => dispatch(fetchPinTaskSeriesSuccess(res.data)))
        .catch(err => dispatch(fetchPinTaskSeriesFailure(err.message)));
};
