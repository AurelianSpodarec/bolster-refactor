import axios from 'axios';

import { API_URL } from 'config/index';
import setAPIFieldErrors from 'actions/shared/generic/fieldErrors/sync/setAPIFieldErrors';
import { getHeaders } from 'helpers/api';

import {
    EDIT_PIN_HISTORY_REQUEST,
    EDIT_PIN_HISTORY_SUCCESS,
    EDIT_PIN_HISTORY_FAILURE
} from 'constants/actionTypes/pins';

export const editPinHistoryRequest = () => ({
    type: EDIT_PIN_HISTORY_REQUEST
});

export const editPinHistorySuccess = payload => ({
    type: EDIT_PIN_HISTORY_SUCCESS,
    payload
});

export const editPinHistoryFailure = error => ({
    type: EDIT_PIN_HISTORY_FAILURE,
    error
});

export default (pinHistoryID, postBody) => dispatch => {
    dispatch(editPinHistoryRequest());

    axios
        .post(`${API_URL}/pins/${pinHistoryID}`, postBody, getHeaders())
        .then(result => dispatch(editPinHistorySuccess(result.data)))
        .catch(error => {
            dispatch(editPinHistoryFailure(error));
            if (error.response.status === 400)
                dispatch(setAPIFieldErrors(error.response.data.errors));
        });
};
