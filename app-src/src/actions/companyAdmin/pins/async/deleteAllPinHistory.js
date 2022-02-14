import axios from 'axios';

import { API_URL } from 'config/index';
import { getHeaders } from 'helpers/api';
import {
    DELETE_ALL_PIN_HISTORY_REQUEST,
    DELETE_ALL_PIN_HISTORY_SUCCESS,
    DELETE_ALL_PIN_HISTORY_FAILURE,
} from 'constants/actionTypes/pins';

export const deleteAllPinHistoryRequest = () => ({
    type: DELETE_ALL_PIN_HISTORY_REQUEST,
});

export const deleteAllPinHistorySuccess = payload => ({
    type: DELETE_ALL_PIN_HISTORY_SUCCESS,
    payload,
});

export const deleteAllPinHistoryFailure = error => ({
    type: DELETE_ALL_PIN_HISTORY_FAILURE,
    error,
});

export default pinID => dispatch => {
    dispatch(deleteAllPinHistoryRequest());

    return axios
        .delete(`${API_URL}/pins/${pinID}/histories`, getHeaders())
        .then(({ data }) => dispatch(deleteAllPinHistorySuccess(data)))
        .catch(error => dispatch(deleteAllPinHistoryFailure(error)));
};
