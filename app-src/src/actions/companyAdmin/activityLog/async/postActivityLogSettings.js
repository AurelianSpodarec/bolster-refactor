import axios from 'axios';

import {
    POST_ACTIVITY_LOG_SETTINGS_REQUEST,
    POST_ACTIVITY_LOG_SETTINGS_SUCCESS,
    POST_ACTIVITY_LOG_SETTINGS_FAILURE,
} from 'constants/actionTypes/activityLog';
import { API_URL } from 'config';
import { getHeaders, handleErrors } from 'helpers/api';

export const postActivityLogSettingsRequest = () => ({
    type: POST_ACTIVITY_LOG_SETTINGS_REQUEST,
});

export const postActivityLogSettingsSuccess = payload => ({
    type: POST_ACTIVITY_LOG_SETTINGS_SUCCESS,
    payload,
});

export const postActivityLogSettingsFailure = error => ({
    type: POST_ACTIVITY_LOG_SETTINGS_FAILURE,
    error,
});

// the items that are sent up should be the items that are to be disabled
export default postBody => async dispatch => {
    dispatch(postActivityLogSettingsRequest());

    return axios
        .post(`${API_URL}/settings/activitysettings`, postBody, getHeaders())
        .then(res => dispatch(postActivityLogSettingsSuccess(res.data)))
        .catch(err => dispatch(handleErrors(postActivityLogSettingsFailure)(err)));
};
