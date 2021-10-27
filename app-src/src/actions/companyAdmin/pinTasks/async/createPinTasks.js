import axios from 'axios';

import { API_URL } from 'config';
import {
    CREATE_PIN_TASKS_REQUEST,
    CREATE_PIN_TASKS_SUCCESS,
    CREATE_PIN_TASKS_FAILURE,
} from 'constants/actionTypes/pinTasks';
import { getHeaders } from 'helpers/api';

export const createPinTasksRequest = () => ({
    type: CREATE_PIN_TASKS_REQUEST,
});

export const createPinTasksSuccess = payload => ({
    type: CREATE_PIN_TASKS_SUCCESS,
    payload,
});

export const createPinTasksFailure = error => ({
    type: CREATE_PIN_TASKS_FAILURE,
    error,
});

export default (
    companyUserID,
    pinIDs,
    startDate,
    recurranceType,
    recurranceDays,
    endDate,
) => dispatch => {
    dispatch(createPinTasksRequest());

    return axios
        .post(
            `${API_URL}/tasks/create`,
            {
                companyUserID,
                pinIDs,
                startDate,
                recurranceType,
                recurranceDays,
                endDate,
            },
            getHeaders(),
        )
        .then(res => dispatch(createPinTasksSuccess(res.data)))
        .catch(err => dispatch(createPinTasksFailure(err.message)));
};
