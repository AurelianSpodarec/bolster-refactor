import axios from 'axios';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import {
    FETCH_USER_PIN_FEED_REQUEST,
    FETCH_USER_PIN_FEED_SUCCESS,
    FETCH_USER_PIN_FEED_FAILURE,
} from 'constants/actionTypes/pins';

export const fetchUserPinFeedRequest = () => ({
    type: FETCH_USER_PIN_FEED_REQUEST,
});

export const fetchUserPinFeedSuccess = payload => ({
    type: FETCH_USER_PIN_FEED_SUCCESS,
    payload,
});

export const fetchUserPinFeedFailure = error => ({
    type: FETCH_USER_PIN_FEED_FAILURE,
    error,
});

export default (userID, date, isWeek = false) => dispatch => {
    dispatch(fetchUserPinFeedRequest());

    return axios
        .post(`${API_URL}/pins/historyfeed/user/${userID}`, { date, isWeek }, getHeaders())
        .then(res => dispatch(fetchUserPinFeedSuccess(res.data)))
        .catch(err => dispatch(fetchUserPinFeedFailure(err.message)));
};
