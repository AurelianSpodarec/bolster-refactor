import axios from 'axios';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import {
    DISMISS_DRAWING_EXPIRY_MESSAGES_REQUEST,
    DISMISS_DRAWING_EXPIRY_MESSAGES_SUCCESS,
    DISMISS_DRAWING_EXPIRY_MESSAGES_FAILURE,
} from 'constants/actionTypes/messageCentre';

export const dismissDrawingExpiryMessagesRequest = () => ({
    type: DISMISS_DRAWING_EXPIRY_MESSAGES_REQUEST,
});

export const dismissDrawingExpiryMessagesSuccess = payload => ({
    type: DISMISS_DRAWING_EXPIRY_MESSAGES_SUCCESS,
    payload,
});

export const dismissDrawingExpiryMessagesFailure = error => ({
    type: DISMISS_DRAWING_EXPIRY_MESSAGES_FAILURE,
    error,
});

export default () => dispatch => {
    dispatch(dismissDrawingExpiryMessagesRequest());

    return axios
        .delete(`${API_URL}/DrawingExpiryMessages/all`, getHeaders())
        .then(() => dispatch(dismissDrawingExpiryMessagesSuccess()))
        .catch(err => {
            dispatch(dismissDrawingExpiryMessagesFailure(err));
        });
};
