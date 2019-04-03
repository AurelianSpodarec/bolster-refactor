import axios from 'axios';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import {
    DISMISS_MESSAGE_REQUEST,
    DISMISS_MESSAGE_SUCCESS,
    DISMISS_MESSAGE_FAILURE
} from 'constants/actionTypes/messages';

export const dismissMessageRequest = id => ({
    type: DISMISS_MESSAGE_REQUEST,
    id
});

export const dismissMessageSuccess = () => ({
    type: DISMISS_MESSAGE_SUCCESS
});

export const dismissMessageFailure = (id, error) => ({
    type: DISMISS_MESSAGE_FAILURE,
    id,
    error
});

export default id => dispatch => {
    dispatch(dismissMessageRequest(id));

    return axios
        .post(`${API_URL}/messages/read/${id}`, null, getHeaders())
        .then(() => dispatch(dismissMessageSuccess()))
        .catch(() => dispatch(dismissMessageFailure(id)));
};
