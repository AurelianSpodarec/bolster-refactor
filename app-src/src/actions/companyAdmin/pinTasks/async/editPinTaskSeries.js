import axios from 'axios';

import { API_URL } from 'config';
import {
    EDIT_PIN_TASK_SERIES_REQUEST,
    EDIT_PIN_TASK_SERIES_SUCCESS,
    EDIT_PIN_TASK_SERIES_FAILURE,
} from 'constants/actionTypes/pinTasks';
import { getHeaders } from 'helpers/api';

export const editPinTaskSeriesRequest = () => ({
    type: EDIT_PIN_TASK_SERIES_REQUEST,
});

export const editPinTaskSeriesSuccess = payload => ({
    type: EDIT_PIN_TASK_SERIES_SUCCESS,
    payload,
});

export const editPinTaskSeriesFailure = error => ({
    type: EDIT_PIN_TASK_SERIES_FAILURE,
    error,
});

export default (id, postBody) => dispatch => {
    dispatch(editPinTaskSeriesRequest());

    return axios
        .patch(`${API_URL}/tasks/series/${id}`, postBody, getHeaders())
        .then(res => dispatch(editPinTaskSeriesSuccess(res.data)))
        .catch(err => dispatch(editPinTaskSeriesFailure(err.message)));
};
