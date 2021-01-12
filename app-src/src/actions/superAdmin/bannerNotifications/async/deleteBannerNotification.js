import axios from 'axios';

import { ADMIN_API_URL } from 'config';

import { getHeaders } from 'helpers/api';
import {
    DELETE_BANNER_NOTIFICATION_REQUEST,
    DELETE_BANNER_NOTIFICATION_SUCCESS,
    DELETE_BANNER_NOTIFICATION_FAILURE,
} from 'constants/actionTypes/superAdminBannerNotifications';

export const deleteBannerNotificationRequest = () => ({
    type: DELETE_BANNER_NOTIFICATION_REQUEST,
});

export const deleteBannerNotificationSuccess = id => ({
    type: DELETE_BANNER_NOTIFICATION_SUCCESS,
    success: true,
    id,
});

export const deleteBannerNotificationFailure = error => ({
    type: DELETE_BANNER_NOTIFICATION_FAILURE,
    error,
});

export default id => dispatch => {
    dispatch(deleteBannerNotificationRequest());
    return axios
        .delete(`${ADMIN_API_URL}/banners/${id}`, getHeaders())
        .then(() => dispatch(deleteBannerNotificationSuccess(id)))
        .catch(err => dispatch(deleteBannerNotificationFailure(err.message)));
};
