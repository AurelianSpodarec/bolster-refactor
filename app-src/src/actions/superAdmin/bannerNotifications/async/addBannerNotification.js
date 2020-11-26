import axios from 'axios';

import setAPIFieldErrors from 'actions/shared/generic/fieldErrors/sync/setAPIFieldErrors';
import { getHeaders } from 'helpers/api';
import {
    ADD_BANNER_NOTIFICATION_REQUEST,
    ADD_BANNER_NOTIFICATION_SUCCESS,
    ADD_BANNER_NOTIFICATION_FAILURE,
} from 'constants/actionTypes/superAdminBannerNotifications';
import { ADMIN_API_URL } from 'config';

export const addBannerNotificationRequest = () => ({
    type: ADD_BANNER_NOTIFICATION_REQUEST,
});

export const addBannerNotificationSuccess = payload => ({
    type: ADD_BANNER_NOTIFICATION_SUCCESS,
    payload,
});

export const addBannerNotificationFailure = error => ({
    type: ADD_BANNER_NOTIFICATION_FAILURE,
    error,
});

export default postBody => dispatch => {
    dispatch(addBannerNotificationRequest());

    axios
        .post(`${ADMIN_API_URL}/banners/create`, postBody, getHeaders())
        .then(result => dispatch(addBannerNotificationSuccess(result.data)))
        .catch(error => {
            dispatch(addBannerNotificationFailure(error));
            if (error.response.status === 400)
                dispatch(setAPIFieldErrors(error.response.data.errors));
        });
};
