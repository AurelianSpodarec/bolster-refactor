import axios from 'axios';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import {
    CLIENT_FETCH_HISTORY_FEED_REQUEST,
    CLIENT_FETCH_HISTORY_FEED_SUCCESS,
    CLIENT_FETCH_HISTORY_FEED_FAILURE
} from 'constants/client/actionTypes/clientDashboard';

export const clientFetchHistoryFeedRequest = () => ({
    type: CLIENT_FETCH_HISTORY_FEED_REQUEST
});

export const clientFetchHistoryFeedSuccess = payload => ({
    type: CLIENT_FETCH_HISTORY_FEED_SUCCESS,
    payload
});

export const clientFetchHistoryFeedFailure = error => ({
    type: CLIENT_FETCH_HISTORY_FEED_FAILURE,
    error
});

export default () => dispatch => {
    dispatch(clientFetchHistoryFeedRequest());

    axios
        // ! change the url
        .get(`${API_URL}/pins/historyfeed`, getHeaders())
        .then(res => dispatch(clientFetchHistoryFeedSuccess(res.data)))
        .catch(err => dispatch(clientFetchHistoryFeedFailure(err.message)));
};
