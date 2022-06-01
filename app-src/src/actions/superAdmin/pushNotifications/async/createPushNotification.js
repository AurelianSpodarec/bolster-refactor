import axios from 'axios';

import { ADMIN_API_URL } from 'config';
import { getHeaders, handleErrors } from 'helpers/api';
import {
    CREATE_ADMIN_PUSH_NOTIFICATION_REQUEST,
    CREATE_ADMIN_PUSH_NOTIFICATION_SUCCESS,
    CREATE_ADMIN_PUSH_NOTIFICATION_FAILURE,
} from 'constants/actionTypes/pushNotifications';

export const createPushNotificationRequest = () => ({
    type: CREATE_ADMIN_PUSH_NOTIFICATION_REQUEST,
});

export const createPushNotificationSuccess = payload => ({
    type: CREATE_ADMIN_PUSH_NOTIFICATION_SUCCESS,
    payload,
});

export const createPushNotificationFailure = error => ({
    type: CREATE_ADMIN_PUSH_NOTIFICATION_FAILURE,
    error,
});

export default postBody => async dispatch => {
    dispatch(createPushNotificationRequest());

    return axios
        .post(`${ADMIN_API_URL}/pushnotifications`, postBody, getHeaders())
        .then(res => dispatch(createPushNotificationSuccess(res.data)))
        .catch(err => dispatch(handleErrors(createPushNotificationFailure)(err)));
};
