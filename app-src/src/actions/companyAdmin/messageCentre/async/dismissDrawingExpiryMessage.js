import axios from 'axios';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import {
    DISMISS_DRAWING_EXPIRY_MESSAGE_REQUEST,
    DISMISS_DRAWING_EXPIRY_MESSAGE_SUCCESS,
    DISMISS_DRAWING_EXPIRY_MESSAGE_FAILURE,
} from 'constants/actionTypes/messageCentre';

export const dismissDrawingExpiryMessageRequest = id => ({
    type: DISMISS_DRAWING_EXPIRY_MESSAGE_REQUEST,
    id,
});

export const dismissDrawingExpiryMessageSuccess = () => ({
    type: DISMISS_DRAWING_EXPIRY_MESSAGE_SUCCESS,
});

export const dismissDrawingExpiryMessageFailure = (id, error) => ({
    type: DISMISS_DRAWING_EXPIRY_MESSAGE_FAILURE,
    id,
    error,
});

export default id => dispatch => {
    dispatch(dismissDrawingExpiryMessageRequest(id));

    return axios
        .delete(`${API_URL}/drawingExpiryMessages/${id}`, null, getHeaders())
        .then(() => dispatch(dismissDrawingExpiryMessageSuccess()))
        .catch(err => dispatch(dismissDrawingExpiryMessageFailure(id, err.message)));
};
