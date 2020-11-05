import axios from 'axios';

import { API_URL } from 'config';
import {
    FETCH_MESSAGES_BASIC_REQUEST,
    FETCH_MESSAGES_BASIC_SUCCESS,
    FETCH_MESSAGES_BASIC_FAILURE,
} from 'constants/actionTypes/messages';
import { getHeaders } from 'helpers/api';

export const fetchMessagesBasicRequest = () => ({
    type: FETCH_MESSAGES_BASIC_REQUEST,
});

export const fetchMessagesBasicSuccess = payload => ({
    type: FETCH_MESSAGES_BASIC_SUCCESS,
    payload,
});

export const fetchMessagesBasicFailure = error => ({
    type: FETCH_MESSAGES_BASIC_FAILURE,
    error,
});

export default () => dispatch => {
    dispatch(fetchMessagesBasicRequest());

    return axios
        .get(`${API_URL}/messages/basic`, getHeaders())
        .then(res => dispatch(fetchMessagesBasicSuccess(res.data)))
        .catch(err => dispatch(fetchMessagesBasicFailure(err.message)));
};
