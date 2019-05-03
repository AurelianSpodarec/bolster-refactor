import axios from 'axios';

import { API_URL } from 'config/index';
import { getHeaders } from 'helpers/api';
import {
    DELETE_PIN_HISTORY_REQUEST,
    DELETE_PIN_HISTORY_SUCCESS,
    DELETE_PIN_HISTORY_FAILURE
} from 'constants/actionTypes/pins';

export const deletePinHistoryRequest = () => ({
    type: DELETE_PIN_HISTORY_REQUEST
});

export const deletePinHistorySuccess = payload => ({
    type: DELETE_PIN_HISTORY_SUCCESS,
    payload
});

export const deletePinHistoryFailure = error => ({
    type: DELETE_PIN_HISTORY_FAILURE,
    error
});

export default pinHistoryID => dispatch => {
    dispatch(deletePinHistoryRequest());

    return axios
        .delete(`${API_URL}/pins/histories/${pinHistoryID}`, getHeaders())
        .then(({ data }) => dispatch(deletePinHistorySuccess(data)))
        .catch(error => dispatch(deletePinHistoryFailure(error)));
};
