import axios from 'axios';

import {
    UPDATE_BANNER_NOTIFICATIONS_REQUEST,
    UPDATE_BANNER_NOTIFICATIONS_SUCCESS,
    UPDATE_BANNER_NOTIFICATIONS_FAILURE,
} from 'constants/actionTypes/companyAdminBanner';
import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';

export const updateBannerNotificationRequest = () => ({
    type: UPDATE_BANNER_NOTIFICATIONS_REQUEST,
});

export const updateBannerNotificationSuccess = payload => ({
    type: UPDATE_BANNER_NOTIFICATIONS_SUCCESS,
    payload,
});

export const updateBannerNotificationFailure = error => ({
    type: UPDATE_BANNER_NOTIFICATIONS_FAILURE,
    error,
});

export default postBody => dispatch => {
    dispatch(updateBannerNotificationRequest());

    return axios
        .post(`${API_URL}/banners/close`, postBody, getHeaders())
        .then(({ data }) => dispatch(updateBannerNotificationSuccess(data)))
        .catch(err => dispatch(updateBannerNotificationFailure(err.message)));
};
