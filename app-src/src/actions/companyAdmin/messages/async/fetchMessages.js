import axios from 'axios';

import { API_URL } from 'config';
import {
    FETCH_MESSAGES_REQUEST,
    FETCH_MESSAGES_SUCCESS,
    FETCH_MESSAGES_FAILURE
} from 'constants/actionTypes/messages';
import { getHeaders } from 'helpers/api';

export const fetchMessagesRequest = () => ({
    type: FETCH_MESSAGES_REQUEST
});

export const fetchMessagesSuccess = payload => ({
    type: FETCH_MESSAGES_SUCCESS,
    payload
});

export const fetchMessagesFailure = error => ({
    type: FETCH_MESSAGES_FAILURE,
    error
});

export default () => dispatch => {
    dispatch(fetchMessagesRequest());

    axios
        .get(`${API_URL}/messages`, getHeaders())
        .then(res => dispatch(fetchMessagesSuccess(res.data)))
        .catch(err => dispatch(fetchMessagesFailure(err.message)));
};
