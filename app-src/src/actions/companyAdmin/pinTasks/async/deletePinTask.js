import axios from 'axios';

import { API_URL } from 'config';
import {
    DELETE_PIN_TASK_REQUEST,
    DELETE_PIN_TASK_SUCCESS,
    DELETE_PIN_TASK_FAILURE,
} from 'constants/actionTypes/pinTasks';
import { getHeaders } from 'helpers/api';

export const deletePinTaskRequest = () => ({
    type: DELETE_PIN_TASK_REQUEST,
});

export const deletePinTaskSuccess = payload => ({
    type: DELETE_PIN_TASK_SUCCESS,
    payload,
});

export const deletePinTaskFailure = error => ({
    type: DELETE_PIN_TASK_FAILURE,
    error,
});

export default id => dispatch => {
    dispatch(deletePinTaskRequest());

    return axios
        .delete(`${API_URL}/tasks/${id}`, getHeaders())
        .then(() => dispatch(deletePinTaskSuccess(id)))
        .catch(err => dispatch(deletePinTaskFailure(err.message)));
};
