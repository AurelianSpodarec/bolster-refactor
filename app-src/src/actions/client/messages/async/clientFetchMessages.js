import axios from 'axios';

import { CLIENT_API_URL } from 'config/index';
import {
    CLIENT_FETCH_MESSAGES_REQUEST,
    CLIENT_FETCH_MESSAGES_SUCCESS,
    CLIENT_FETCH_MESSAGES_FAILURE
} from 'constants/actionTypes/messages';
import { getHeaders } from 'helpers/api';

export const clientFetchMessagesRequest = () => ({
    type: CLIENT_FETCH_MESSAGES_REQUEST
});

export const clientFetchMessagesSuccess = payload => ({
    type: CLIENT_FETCH_MESSAGES_SUCCESS,
    payload
});

export const clientFetchMessagesFailure = error => ({
    type: CLIENT_FETCH_MESSAGES_FAILURE,
    error
});

export default companyID => dispatch => {
    dispatch(clientFetchMessagesRequest());

    axios
        .get(`${CLIENT_API_URL}/messages/${companyID}`, getHeaders())
        .then(res => dispatch(clientFetchMessagesSuccess(res.data)))
        .catch(err => dispatch(clientFetchMessagesFailure(err.message)));
};
