import axios from 'axios';

import {
    FETCH_NOTIFICATIONS_REQUEST,
    FETCH_NOTIFICATIONS_SUCCESS,
    FETCH_NOTIFICATIONS_FAILURE
} from 'constants/actionTypes/notifications';

export const fetchNotificationsRequest = () => ({
    type: FETCH_NOTIFICATIONS_REQUEST
});

export const fetchNotificationsSuccess = payload => ({
    type: FETCH_NOTIFICATIONS_SUCCESS,
    payload
});

export const fetchNotificationsFailure = error => ({
    type: FETCH_NOTIFICATIONS_FAILURE,
    error
});

export default () => dispatch => {
    dispatch(fetchNotificationsRequest());

    axios
        .get('mockData/notifications/notifications.json')
        .then(res => dispatch(fetchNotificationsSuccess(res.data)))
        .catch(err => dispatch(fetchNotificationsFailure(err.message)));
};
