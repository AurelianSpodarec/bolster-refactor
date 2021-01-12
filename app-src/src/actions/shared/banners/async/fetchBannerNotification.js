import axios from 'axios';

import {
    FETCH_SINGLE_BANNER_NOTIFICATIONS_REQUEST,
    FETCH_SINGLE_BANNER_NOTIFICATIONS_SUCCESS,
    FETCH_SINGLE_BANNER_NOTIFICATIONS_FAILURE,
} from 'constants/actionTypes/companyAdminBanner';
import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';

export const fetchBannerNotificationRequest = () => ({
    type: FETCH_SINGLE_BANNER_NOTIFICATIONS_REQUEST,
});

export const fetchBannerNotificationSuccess = payload => ({
    type: FETCH_SINGLE_BANNER_NOTIFICATIONS_SUCCESS,
    payload,
});

export const fetchBannerNotificationFailure = error => ({
    type: FETCH_SINGLE_BANNER_NOTIFICATIONS_FAILURE,
    error,
});

export default () => dispatch => {
    dispatch(fetchBannerNotificationRequest());

    return axios
        .get(`${API_URL}/banners`, getHeaders())
        .then(({ data }) => dispatch(fetchBannerNotificationSuccess(data)))
        .catch(err => dispatch(fetchBannerNotificationFailure(err.message)));
};
