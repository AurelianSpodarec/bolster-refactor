import axios from 'axios';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import {
    CLIENT_FETCH_HISTORY_FEED_REQUEST,
    CLIENT_FETCH_HISTORY_FEED_SUCCESS,
    CLIENT_FETCH_HISTORY_FEED_FAILURE
} from 'constants/client/actionTypes/clientDashboard';

export const fetchHistoryFeedRequest = () => ({
    type: CLIENT_FETCH_HISTORY_FEED_REQUEST
});

export const fetchHistoryFeedSuccess = payload => ({
    type: CLIENT_FETCH_HISTORY_FEED_SUCCESS,
    payload
});

export const fetchHistoryFeedFailure = error => ({
    type: CLIENT_FETCH_HISTORY_FEED_FAILURE,
    error
});

export default () => dispatch => {
    dispatch(fetchHistoryFeedRequest());

    axios
        .get(`${API_URL}/pins/historyfeed`, getHeaders())
        .then(res => dispatch(fetchHistoryFeedSuccess(res.data)))
        .catch(err => dispatch(fetchHistoryFeedFailure(err.message)));
};
