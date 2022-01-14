import axios from 'axios';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import {
    DISMISS_SYSTEM_MESSAGES_REQUEST,
    DISMISS_SYSTEM_MESSAGES_SUCCESS,
    DISMISS_SYSTEM_MESSAGES_FAILURE,
} from 'constants/actionTypes/messageCentre';

export const dismissSystemMessagesRequest = alertType => ({
    type: DISMISS_SYSTEM_MESSAGES_REQUEST,
    alertType,
});

export const dismissSystemMessagesSuccess = () => ({
    type: DISMISS_SYSTEM_MESSAGES_SUCCESS,
});

export const dismissSystemMessagesFailure = error => ({
    type: DISMISS_SYSTEM_MESSAGES_FAILURE,
    error,
});

export default alertType => dispatch => {
    dispatch(dismissSystemMessagesRequest(alertType));

    return axios
        .delete(`${API_URL}/systemMessages/all`, {}, getHeaders())
        .then(() => dispatch(dismissSystemMessagesSuccess()))
        .catch(err => {
            dispatch(dismissSystemMessagesFailure(err));
        });
};
