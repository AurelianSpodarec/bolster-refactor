import axios from 'axios';

import { API_URL } from '../../../../config';
import { getHeaders } from '../../../../helpers/api';
import {
    FETCH_SINGLE_PIN_TASKS_REQUEST,
    FETCH_SINGLE_PIN_TASKS_SUCCESS,
    FETCH_SINGLE_PIN_TASKS_FAILURE,
} from '../../../../constants/actionTypes/pinTasks';

export const fetchSinglePinTasksRequest = () => ({
    type: FETCH_SINGLE_PIN_TASKS_REQUEST,
});

export const fetchSinglePinTasksSuccess = payload => ({
    type: FETCH_SINGLE_PIN_TASKS_SUCCESS,
    payload,
});

export const fetchSinglePinTasksFailure = error => ({
    type: FETCH_SINGLE_PIN_TASKS_FAILURE,
    error,
});

export default id => dispatch => {
    dispatch(fetchSinglePinTasksRequest());

    return axios
        .get(`${API_URL}/pins/tasks/${id}`, getHeaders())
        .then(res => dispatch(fetchSinglePinTasksSuccess(res.data)))
        .catch(err => dispatch(fetchSinglePinTasksFailure(err.message)));
};
