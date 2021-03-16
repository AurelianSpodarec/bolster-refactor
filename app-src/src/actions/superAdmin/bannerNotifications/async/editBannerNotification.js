import axios from 'axios';

import setAPIFieldErrors from 'actions/shared/generic/fieldErrors/sync/setAPIFieldErrors';
import { getHeaders } from 'helpers/api';
import {
    EDIT_BANNER_NOTIFICATION_FAILURE,
    EDIT_BANNER_NOTIFICATION_REQUEST,
    EDIT_BANNER_NOTIFICATION_SUCCESS,
} from 'constants/actionTypes/superAdminBannerNotifications';
import { ADMIN_API_URL } from 'config';

export const editBannerNotificationRequest = () => ({
    type: EDIT_BANNER_NOTIFICATION_REQUEST,
});

export const editBannerNotificationSuccess = payload => ({
    type: EDIT_BANNER_NOTIFICATION_SUCCESS,
    payload,
});

export const editBannerNotificationFailure = error => ({
    type: EDIT_BANNER_NOTIFICATION_FAILURE,
    error,
});

export default (postBody, id) => dispatch => {
    dispatch(editBannerNotificationRequest());
    axios
        .patch(`${ADMIN_API_URL}/banners/edit/${id}`, postBody, getHeaders())
        .then(result => dispatch(editBannerNotificationSuccess(result.data)))
        .catch(error => {
            dispatch(editBannerNotificationFailure(error));
            if (error.response.status === 400)
                dispatch(setAPIFieldErrors(error.response.data.errors));
        });
};
