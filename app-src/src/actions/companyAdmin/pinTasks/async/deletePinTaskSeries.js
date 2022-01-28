import axios from 'axios';

import { API_URL } from 'config';
import {
    DELETE_PIN_TASK_SERIES_REQUEST,
    DELETE_PIN_TASK_SERIES_SUCCESS,
    DELETE_PIN_TASK_SERIES_FAILURE,
} from 'constants/actionTypes/pinTasks';
import { getHeaders } from 'helpers/api';

export const deletePinTaskSeriesRequest = () => ({
    type: DELETE_PIN_TASK_SERIES_REQUEST,
});

export const deletePinTaskSeriesSuccess = payload => ({
    type: DELETE_PIN_TASK_SERIES_SUCCESS,
    payload,
});

export const deletePinTaskSeriesFailure = error => ({
    type: DELETE_PIN_TASK_SERIES_FAILURE,
    error,
});

export default id => dispatch => {
    dispatch(deletePinTaskSeriesRequest());

    return axios
        .delete(`${API_URL}/tasks/series/${id}`, getHeaders())
        .then(() => dispatch(deletePinTaskSeriesSuccess(id)))
        .catch(err => dispatch(deletePinTaskSeriesFailure(err.message)));
};
