import axios from 'axios';

import { API_URL } from 'config';
import {
    FETCH_DRAWING_EXPIRY_MESSAGES_REQUEST,
    FETCH_DRAWING_EXPIRY_MESSAGES_SUCCESS,
    FETCH_DRAWING_EXPIRY_MESSAGES_FAILURE,
} from 'constants/actionTypes/messageCentre';
import { getHeaders } from 'helpers/api';

export const fetchDrawingExpiryMessagesRequest = () => ({
    type: FETCH_DRAWING_EXPIRY_MESSAGES_REQUEST,
});

export const fetchDrawingExpiryMessagesSuccess = payload => ({
    type: FETCH_DRAWING_EXPIRY_MESSAGES_SUCCESS,
    payload,
});

export const fetchDrawingExpiryMessagesFailure = error => ({
    type: FETCH_DRAWING_EXPIRY_MESSAGES_FAILURE,
    error,
});

export default () => dispatch => {
    dispatch(fetchDrawingExpiryMessagesRequest());

    axios
        .get(`${API_URL}/drawingExpiryMessages`, getHeaders())
        .then(res => dispatch(fetchDrawingExpiryMessagesSuccess(res.data)))
        .catch(err => dispatch(fetchDrawingExpiryMessagesFailure(err.message)));
};
