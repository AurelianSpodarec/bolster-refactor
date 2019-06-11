import axios from 'axios';

import { CLIENT_API_URL } from 'config/index';
import { getHeaders } from 'helpers/api';
import {
    CLIENT_DISMISS_MESSAGES_REQUEST,
    CLIENT_DISMISS_MESSAGES_SUCCESS,
    CLIENT_DISMISS_MESSAGES_FAILURE
} from 'constants/client/actionTypes/clientMessages';
import clientFetchMessages from './clientFetchMessages';

export const clientDismissMessagesRequest = messageType => ({
    type: CLIENT_DISMISS_MESSAGES_REQUEST,
    messageType
});

export const clientDismissMessagesSuccess = () => ({
    type: CLIENT_DISMISS_MESSAGES_SUCCESS
});

export const clientDismissMessagesFailure = error => ({
    type: CLIENT_DISMISS_MESSAGES_FAILURE,
    error
});

export default (companyID, messageType) => dispatch => {
    dispatch(clientDismissMessagesRequest(messageType));

    return axios
        .post(
            `${CLIENT_API_URL}/messages/read-all/${messageType}`,
            null,
            getHeaders()
        )
        .then(() => dispatch(clientDismissMessagesSuccess()))
        .catch(err => {
            dispatch(clientDismissMessagesFailure(err));
            dispatch(clientFetchMessages(companyID));
        });
};
