import axios from 'axios';
import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';

import {
    FETCH_LATEST_APP_VERSION_REQUEST,
    FETCH_LATEST_APP_VERSION_SUCCESS,
    FETCH_LATEST_APP_VERSION_FAILURE,
} from 'constants/actionTypes/app';

export const fetchLatestAppVersionRequest = () => ({
    type: FETCH_LATEST_APP_VERSION_REQUEST,
});

export const fetchLatestAppVersionSuccess = payload => ({
    type: FETCH_LATEST_APP_VERSION_SUCCESS,
    payload,
});

export const fetchLatestAppVersionFailure = error => ({
    type: FETCH_LATEST_APP_VERSION_FAILURE,
    error,
});

export default () => dispatch => {
    dispatch(fetchLatestAppVersionRequest());

    return axios
        .get(`${API_URL}/appversion/latest`, getHeaders())
        .then(res => dispatch(fetchLatestAppVersionSuccess(res.data)))
        .catch(err => dispatch(fetchLatestAppVersionFailure(err.message)));
};
