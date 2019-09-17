import axios from 'axios';

import { API_URL } from 'config/index';
import { getHeaders } from 'helpers/api';
import {
    RESTORE_PIN_HISTORY_REQUEST,
    RESTORE_PIN_HISTORY_SUCCESS,
    RESTORE_PIN_HISTORY_FAILURE
} from 'constants/actionTypes/deletedData';

export const restorePinHistoryRequest = () => ({
    type: RESTORE_PIN_HISTORY_REQUEST
});

export const restorePinHistorySuccess = payload => ({
    type: RESTORE_PIN_HISTORY_SUCCESS,
    payload
});

export const restorePinHistoryFailure = error => ({
    type: RESTORE_PIN_HISTORY_FAILURE,
    error
});

export default pinHistoryID => dispatch => {
    dispatch(restorePinHistoryRequest());

    return axios
        .delete(`${API_URL}/pins/histories/${pinHistoryID}?undo=true`, getHeaders())
        .then(({ data }) => dispatch(restorePinHistorySuccess(data)))
        .catch(error => dispatch(restorePinHistoryFailure(error)));
};
