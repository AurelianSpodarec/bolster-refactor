import axios from 'axios';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import {
    FETCH_HISTORY_FEED_REQUEST,
    FETCH_HISTORY_FEED_SUCCESS,
    FETCH_HISTORY_FEED_FAILURE
} from 'constants/actionTypes/dashboard';

export const fetchHistoryFeedRequest = () => ({
    type: FETCH_HISTORY_FEED_REQUEST
});

export const fetchHistoryFeedSuccess = payload => ({
    type: FETCH_HISTORY_FEED_SUCCESS,
    payload
});

export const fetchHistoryFeedFailure = error => ({
    type: FETCH_HISTORY_FEED_FAILURE,
    error
});

export default () => dispatch => {
    dispatch(fetchHistoryFeedRequest());

    axios
        .get(`${API_URL}/pins/historyfeed`, getHeaders())
        .then(res => dispatch(fetchHistoryFeedSuccess(res.data)))
        .catch(err => dispatch(fetchHistoryFeedFailure(err.message)));
};
