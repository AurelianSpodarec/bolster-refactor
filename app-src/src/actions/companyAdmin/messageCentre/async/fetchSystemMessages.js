import axios from 'axios';

import { API_URL } from 'config';
import {
    FETCH_SYSTEM_MESSAGES_REQUEST,
    FETCH_SYSTEM_MESSAGES_SUCCESS,
    FETCH_SYSTEM_MESSAGES_FAILURE,
} from 'constants/actionTypes/messageCentre';
import { getHeaders } from 'helpers/api';

export const fetchSystemMessagesRequest = () => ({
    type: FETCH_SYSTEM_MESSAGES_REQUEST,
});

export const fetchSystemMessagesSuccess = payload => ({
    type: FETCH_SYSTEM_MESSAGES_SUCCESS,
    payload,
});

export const fetchSystemMessagesFailure = error => ({
    type: FETCH_SYSTEM_MESSAGES_FAILURE,
    error,
});

export default () => dispatch => {
    dispatch(fetchSystemMessagesRequest());

    axios
        .get(`${API_URL}/systemMessages`, getHeaders())
        .then(res => dispatch(fetchSystemMessagesSuccess(res.data)))
        .catch(err => dispatch(fetchSystemMessagesFailure(err.message)));
};
