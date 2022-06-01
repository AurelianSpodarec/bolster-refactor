import axios from 'axios';

import { ADMIN_API_URL } from 'config';
import { getHeaders, handleErrors } from 'helpers/api';
import {
    DELETE_ADMIN_PUSH_NOTIFICATION_REQUEST,
    DELETE_ADMIN_PUSH_NOTIFICATION_SUCCESS,
    DELETE_ADMIN_PUSH_NOTIFICATION_FAILURE,
} from 'constants/actionTypes/pushNotifications';

export const deletePushNotificationRequest = () => ({
    type: DELETE_ADMIN_PUSH_NOTIFICATION_REQUEST,
});

export const deletePushNotificationSuccess = id => ({
    type: DELETE_ADMIN_PUSH_NOTIFICATION_SUCCESS,
    id,
});

export const deletePushNotificationFailure = error => ({
    type: DELETE_ADMIN_PUSH_NOTIFICATION_FAILURE,
    error,
});

export default id => async dispatch => {
    dispatch(deletePushNotificationRequest());

    return axios
        .delete(`${ADMIN_API_URL}/pushnotifications/${id}`, getHeaders())
        .then(() => dispatch(deletePushNotificationSuccess(id)))
        .catch(err => dispatch(handleErrors(deletePushNotificationFailure)(err)));
};
