import axios from 'axios';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import {
    CLIENT_FETCH_LIVE_HISTORIES_REQUEST,
    CLIENT_FETCH_LIVE_HISTORIES_SUCCESS,
    CLIENT_FETCH_LIVE_HISTORIES_FAILURE
} from 'constants/actionTypes/dashboard';

export const clientFetchLiveHistoriesRequest = () => ({
    type: CLIENT_FETCH_LIVE_HISTORIES_REQUEST
});

export const clientFetchLiveHistoriesSuccess = payload => ({
    type: CLIENT_FETCH_LIVE_HISTORIES_SUCCESS,
    payload
});

export const clientFetchLiveHistoriesFailure = error => ({
    type: CLIENT_FETCH_LIVE_HISTORIES_FAILURE,
    error
});

export default lastUpdate => dispatch => {
    dispatch(clientFetchLiveHistoriesRequest());

    return (
        axios
            // ! change the url
            .get(`${API_URL}/pins/historyfeed${lastUpdate}`, getHeaders())
            .then(res => dispatch(clientFetchLiveHistoriesSuccess(res.data)))
            .catch(err =>
                dispatch(clientFetchLiveHistoriesFailure(err.message))
            )
    );
};
