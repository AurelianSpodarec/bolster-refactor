import axios from 'axios';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import {
    CLIENT_FETCH_PIN_FEED_REQUEST,
    CLIENT_FETCH_PIN_FEED_SUCCESS,
    CLIENT_FETCH_PIN_FEED_FAILURE
} from 'constants/client/actionTypes/clientPins';

export const clientFetchPinFeedRequest = () => ({
    type: CLIENT_FETCH_PIN_FEED_REQUEST
});

export const clientFetchPinFeedSuccess = payload => ({
    type: CLIENT_FETCH_PIN_FEED_SUCCESS,
    payload
});

export const clientFetchPinFeedFailure = error => ({
    type: CLIENT_FETCH_PIN_FEED_FAILURE,
    error
});

export default lastUpdated => dispatch => {
    dispatch(clientFetchPinFeedRequest(lastUpdated));

    return (
        axios
            // ! change this url
            .get(
                `${API_URL}/pins/historyfeed${
                    lastUpdated ? `?lastUpdateDate=${lastUpdated}` : ''
                }`,
                getHeaders()
            )
            .then(res => dispatch(clientFetchPinFeedSuccess(res.data)))
            .catch(err => dispatch(clientFetchPinFeedFailure(err.message)))
    );
};
