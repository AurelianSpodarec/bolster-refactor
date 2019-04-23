import axios from 'axios';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import {
    FETCH_LIVE_HISTORIES_REQUEST,
    FETCH_LIVE_HISTORIES_SUCCESS,
    FETCH_LIVE_HISTORIES_FAILURE
} from 'constants/actionTypes/dashboard';

export const fetchLiveHistoriesRequest = () => ({
    type: FETCH_LIVE_HISTORIES_REQUEST
});

export const fetchLiveHistoriesSuccess = payload => ({
    type: FETCH_LIVE_HISTORIES_SUCCESS,
    payload
});

export const fetchLiveHistoriesFailure = error => ({
    type: FETCH_LIVE_HISTORIES_FAILURE,
    error
});

export default postBody => dispatch => {
    dispatch(fetchLiveHistoriesRequest());

    return axios
        .get(`${API_URL}/pins/historyfeed${postBody}`, getHeaders())
        .then(res => dispatch(fetchLiveHistoriesSuccess(res.data)))
        .catch(err => dispatch(fetchLiveHistoriesFailure(err.message)));
};
