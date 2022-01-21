import axios from 'axios';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import {
    DISMISS_SYSTEM_MESSAGES_REQUEST,
    DISMISS_SYSTEM_MESSAGES_SUCCESS,
    DISMISS_SYSTEM_MESSAGES_FAILURE,
} from 'constants/actionTypes/messageCentre';

export const dismissSystemMessagesRequest = () => ({
    type: DISMISS_SYSTEM_MESSAGES_REQUEST,
});

export const dismissSystemMessagesSuccess = () => ({
    type: DISMISS_SYSTEM_MESSAGES_SUCCESS,
});

export const dismissSystemMessagesFailure = error => ({
    type: DISMISS_SYSTEM_MESSAGES_FAILURE,
    error,
});

export default () => dispatch => {
    dispatch(dismissSystemMessagesRequest());

    return axios
        .delete(`${API_URL}/systemMessages/all`, getHeaders())
        .then(() => dispatch(dismissSystemMessagesSuccess()))
        .catch(err => {
            dispatch(dismissSystemMessagesFailure(err));
        });
};
