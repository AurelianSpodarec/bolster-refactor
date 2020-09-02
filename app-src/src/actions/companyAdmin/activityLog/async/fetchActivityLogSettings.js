import axios from 'axios';

import {
    FETCH_ACTIVITY_LOG_SETTINGS_REQUEST,
    FETCH_ACTIVITY_LOG_SETTINGS_SUCCESS,
    FETCH_ACTIVITY_LOG_SETTINGS_FAILURE,
} from 'constants/actionTypes/activityLog';
import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';

export const fetchActivityLogSettingsRequest = () => ({
    type: FETCH_ACTIVITY_LOG_SETTINGS_REQUEST,
});

export const fetchActivityLogSettingsSuccess = payload => ({
    type: FETCH_ACTIVITY_LOG_SETTINGS_SUCCESS,
    payload,
});

export const fetchActivityLogSettingsFailure = error => ({
    type: FETCH_ACTIVITY_LOG_SETTINGS_FAILURE,
    error,
});

export default () => dispatch => {
    dispatch(fetchActivityLogSettingsRequest());

    return axios
        .get(`${API_URL}/settings/activitysettings`, getHeaders())
        .then(res => dispatch(fetchActivityLogSettingsSuccess(res.data)))
        .catch(err => dispatch(fetchActivityLogSettingsFailure(err.message)));
};
