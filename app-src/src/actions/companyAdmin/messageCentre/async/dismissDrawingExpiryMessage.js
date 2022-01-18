import axios from 'axios';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import {
    DISMISS_DRAWING_EXPIRY_MESSAGE_REQUEST,
    DISMISS_DRAWING_EXPIRY_MESSAGE_SUCCESS,
    DISMISS_DRAWING_EXPIRY_MESSAGE_FAILURE,
} from 'constants/actionTypes/messageCentre';

export const dismissDrawingExpiryMessageRequest = () => ({
    type: DISMISS_DRAWING_EXPIRY_MESSAGE_REQUEST,
});

export const dismissDrawingExpiryMessageSuccess = payload => ({
    type: DISMISS_DRAWING_EXPIRY_MESSAGE_SUCCESS,
    payload,
});

export const dismissDrawingExpiryMessageFailure = error => ({
    type: DISMISS_DRAWING_EXPIRY_MESSAGE_FAILURE,
    error,
});

export default id => dispatch => {
    dispatch(dismissDrawingExpiryMessageRequest());

    return axios
        .delete(`${API_URL}/drawingExpiryMessages/${id}`, getHeaders())
        .then(() => dispatch(dismissDrawingExpiryMessageSuccess(id)))
        .catch(err => dispatch(dismissDrawingExpiryMessageFailure(id, err.message)));
};
