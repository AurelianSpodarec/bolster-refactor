import axios from 'axios';

import { API_URL } from 'config';
import {
    EDIT_PIN_TASK_REQUEST,
    EDIT_PIN_TASK_SUCCESS,
    EDIT_PIN_TASK_FAILURE,
} from 'constants/actionTypes/pinTasks';
import { getHeaders } from 'helpers/api';

export const editPinTaskRequest = () => ({
    type: EDIT_PIN_TASK_REQUEST,
});

export const editPinTaskSuccess = payload => ({
    type: EDIT_PIN_TASK_SUCCESS,
    payload,
});

export const editPinTaskFailure = error => ({
    type: EDIT_PIN_TASK_FAILURE,
    error,
});

export default (id, dueDate) => dispatch => {
    dispatch(editPinTaskRequest());

    return axios
        .post(
            `${API_URL}/tasks/${id}`,
            {
                dueDate,
            },
            getHeaders(),
        )
        .then(res => dispatch(editPinTaskSuccess(res.data)))
        .catch(err => dispatch(editPinTaskFailure(err.message)));
};
