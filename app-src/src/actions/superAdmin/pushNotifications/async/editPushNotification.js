import axios from 'axios';

import { ADMIN_API_URL } from 'config';
import { getHeaders, handleErrors } from 'helpers/api';
import {
    EDIT_ADMIN_PUSH_NOTIFICATION_REQUEST,
    EDIT_ADMIN_PUSH_NOTIFICATION_SUCCESS,
    EDIT_ADMIN_PUSH_NOTIFICATION_FAILURE,
} from 'constants/actionTypes/pushNotifications';

export const editPushNotificationRequest = () => ({
    type: EDIT_ADMIN_PUSH_NOTIFICATION_REQUEST,
});

export const editPushNotificationSuccess = payload => ({
    type: EDIT_ADMIN_PUSH_NOTIFICATION_SUCCESS,
    payload,
});

export const editPushNotificationFailure = error => ({
    type: EDIT_ADMIN_PUSH_NOTIFICATION_FAILURE,
    error,
});

export default (id, postBody) => async dispatch => {
    dispatch(editPushNotificationRequest());

    return axios
        .patch(`${ADMIN_API_URL}/pushnotifications/${id}`, postBody, getHeaders())
        .then(res => dispatch(editPushNotificationSuccess(res.data)))
        .catch(err => dispatch(handleErrors(editPushNotificationFailure)(err)));
};
