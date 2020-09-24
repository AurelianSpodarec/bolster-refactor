import axios from 'axios';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import {
    POST_RECENT_UPDATES_REQUEST,
    POST_RECENT_UPDATES_SUCCESS,
    POST_RECENT_UPDATES_FAILURE,
} from 'constants/actionTypes/recentUpdates';

export const postRecentUpdatesRequest = () => ({
    type: POST_RECENT_UPDATES_REQUEST,
});

export const postRecentUpdatesSuccess = payload => ({
    type: POST_RECENT_UPDATES_SUCCESS,
    payload,
});

export const postRecentUpdatesFailure = error => ({
    type: POST_RECENT_UPDATES_FAILURE,
    error,
});

export default postBody => dispatch => {
    dispatch(postRecentUpdatesRequest());

    return axios
        .post(`${API_URL}/users/recentupdates`, postBody, getHeaders())
        .then(res => dispatch(postRecentUpdatesSuccess(res.data)))
        .catch(err => dispatch(postRecentUpdatesFailure(err.message)));
};
