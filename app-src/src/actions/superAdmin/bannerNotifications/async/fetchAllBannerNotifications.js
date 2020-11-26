import axios from 'axios';

import {
    FETCH_ALL_BANNER_NOTIFICATIONS_REQUEST,
    FETCH_ALL_BANNER_NOTIFICATIONS_SUCCESS,
    FETCH_ALL_BANNER_NOTIFICATIONS_FAILURE,
} from 'constants/actionTypes/superAdminBannerNotifications';
import { ADMIN_API_URL } from 'config';
import { getHeaders } from 'helpers/api';

export const fetchBAnnerNotificationsRequest = () => ({
    type: FETCH_ALL_BANNER_NOTIFICATIONS_REQUEST,
});

export const fetchBAnnerNotificationsSuccess = payload => ({
    type: FETCH_ALL_BANNER_NOTIFICATIONS_SUCCESS,
    payload,
});

export const fetchBAnnerNotificationsFailure = error => ({
    type: FETCH_ALL_BANNER_NOTIFICATIONS_FAILURE,
    error,
});

export default () => dispatch => {
    dispatch(fetchBAnnerNotificationsRequest());

    return axios
        .get(`${ADMIN_API_URL}/banners`, getHeaders())
        .then(({ data }) => dispatch(fetchBAnnerNotificationsSuccess(data)))
        .catch(err => dispatch(fetchBAnnerNotificationsFailure(err.message)));
};
