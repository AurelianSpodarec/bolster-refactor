import axios from 'axios';

import { API_URL } from 'config';
import {
    FETCH_PIN_TASK_FAILURE,
    FETCH_PIN_TASK_REQUEST,
    FETCH_PIN_TASK_SUCCESS,
} from 'constants/actionTypes/pinTasks';
import { getHeaders } from 'helpers/api';

export const fetchPinTaskRequest = () => ({
    type: FETCH_PIN_TASK_REQUEST,
});

export const fetchPinTaskSuccess = payload => ({
    type: FETCH_PIN_TASK_SUCCESS,
    payload,
});

export const fetchPinTaskFailure = error => ({
    type: FETCH_PIN_TASK_FAILURE,
    error,
});

export default id => dispatch => {
    dispatch(fetchPinTaskRequest());

    return axios
        .get(`${API_URL}/tasks/${id}`, getHeaders())
        .then(res => dispatch(fetchPinTaskSuccess(res.data)))
        .catch(err => dispatch(fetchPinTaskFailure(err.message)));
};
