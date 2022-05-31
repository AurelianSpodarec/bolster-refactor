import axios from 'axios';

import { ADMIN_API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import {
    FETCH_ADMIN_PUSH_NOTIFICATIONS_REQUEST,
    FETCH_ADMIN_PUSH_NOTIFICATIONS_SUCCESS,
    FETCH_ADMIN_PUSH_NOTIFICATIONS_FAILURE,
} from 'constants/actionTypes/pushNotifications';

export const fetchPushNotificationsRequest = () => ({
    type: FETCH_ADMIN_PUSH_NOTIFICATIONS_REQUEST,
});

export const fetchPushNotificationsSuccess = payload => ({
    type: FETCH_ADMIN_PUSH_NOTIFICATIONS_SUCCESS,
    payload,
});

export const fetchPushNotificationsFailure = error => ({
    type: FETCH_ADMIN_PUSH_NOTIFICATIONS_FAILURE,
    error,
});

export default () => async dispatch => {
    dispatch(fetchPushNotificationsRequest());

    return axios
        .get(`${ADMIN_API_URL}/pushnotifications`, getHeaders())
        .then(res => dispatch(fetchPushNotificationsSuccess(res.data)))
        .catch(err => dispatch(fetchPushNotificationsFailure(err.message)));
};
