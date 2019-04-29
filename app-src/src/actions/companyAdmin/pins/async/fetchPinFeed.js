import axios from 'axios';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import {
    FETCH_PIN_FEED_REQUEST,
    FETCH_PIN_FEED_SUCCESS,
    FETCH_PIN_FEED_FAILURE
} from 'constants/actionTypes/pins';

export const fetchPinFeedRequest = () => ({
    type: FETCH_PIN_FEED_REQUEST
});

export const fetchPinFeedSuccess = payload => ({
    type: FETCH_PIN_FEED_SUCCESS,
    payload
});

export const fetchPinFeedFailure = error => ({
    type: FETCH_PIN_FEED_FAILURE,
    error
});

export default lastUpdated => dispatch => {
    dispatch(fetchPinFeedRequest(lastUpdated));

    return axios
        .get(
            `${API_URL}/pins/historyfeed${
                lastUpdated ? `?lastUpdateDate=${lastUpdated}` : ''
            }`,
            getHeaders()
        )
        .then(res => dispatch(fetchPinFeedSuccess(res.data)))
        .catch(err => dispatch(fetchPinFeedFailure(err.message)));
};
