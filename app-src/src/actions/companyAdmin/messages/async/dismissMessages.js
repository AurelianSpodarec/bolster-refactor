import axios from 'axios';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import {
    DISMISS_MESSAGES_REQUEST,
    DISMISS_MESSAGES_SUCCESS,
    DISMISS_MESSAGES_FAILURE
} from 'constants/actionTypes/messages';
import fetchMessages from './fetchMessages';

export const dismissMessagesRequest = messageType => ({
    type: DISMISS_MESSAGES_REQUEST,
    messageType
});

export const dismissMessagesSuccess = () => ({
    type: DISMISS_MESSAGES_SUCCESS
});

export const dismissMessagesFailure = error => ({
    type: DISMISS_MESSAGES_FAILURE,
    error
});

export default messageType => dispatch => {
    dispatch(dismissMessagesRequest(messageType));

    return axios
        .post(`${API_URL}/messages/read/${messageType}`, null, getHeaders())
        .then(() => dispatch(dismissMessagesSuccess()))
        .catch(err => {
            dispatch(dismissMessagesFailure(err));
            dispatch(fetchMessages());
        });
};
