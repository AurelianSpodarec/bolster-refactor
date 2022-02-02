import axios from 'axios';

import { API_URL } from 'config';
import {
    FETCH_PIN_TASKS_FAILURE,
    FETCH_PIN_TASKS_REQUEST,
    FETCH_PIN_TASKS_SUCCESS,
} from 'constants/actionTypes/pinTasks';
import { getHeaders } from 'helpers/api';

export const fetchPinTasksRequest = () => ({
    type: FETCH_PIN_TASKS_REQUEST,
});

export const fetchPinTasksSuccess = payload => ({
    type: FETCH_PIN_TASKS_SUCCESS,
    payload,
});

export const fetchPinTasksFailure = error => ({
    type: FETCH_PIN_TASKS_FAILURE,
    error,
});

export default (from, to) => dispatch => {
    dispatch(fetchPinTasksRequest());

    return axios
        .get(`${API_URL}/tasks?from=${from}&to=${to}`, getHeaders())
        .then(res => dispatch(fetchPinTasksSuccess(res.data)))
        .catch(err => dispatch(fetchPinTasksFailure(err.message)));
};
