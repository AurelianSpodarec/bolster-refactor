import axios from 'axios';
import moment from 'moment';

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
    const formattedFrom = moment(from).format('YYYY-MM-DD');
    const formattedTo = moment(to).format('YYYY-MM-DD');
    return axios
        .get(`${API_URL}/tasks?from=${formattedFrom}&to=${formattedTo}`, getHeaders())
        .then(res => dispatch(fetchPinTasksSuccess(res.data)))
        .catch(err => dispatch(fetchPinTasksFailure(err.message)));
};
