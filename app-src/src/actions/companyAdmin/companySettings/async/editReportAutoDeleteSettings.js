import axios from 'axios';

import {
    EDIT_REPORT_AUTO_DELETE_SETTINGS_REQUEST,
    EDIT_REPORT_AUTO_DELETE_SETTINGS_SUCCESS,
    EDIT_REPORT_AUTO_DELETE_SETTINGS_FAILURE,
} from 'constants/actionTypes/reportAutoDeleteSettings';
import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';

export const editReportAutoDeleteSettingsRequest = () => ({
    type: EDIT_REPORT_AUTO_DELETE_SETTINGS_REQUEST,
});

export const editReportAutoDeleteSettingsSuccess = payload => ({
    type: EDIT_REPORT_AUTO_DELETE_SETTINGS_SUCCESS,
    payload,
});

export const editReportAutoDeleteSettingsFailure = error => ({
    type: EDIT_REPORT_AUTO_DELETE_SETTINGS_FAILURE,
    error,
});

export default postBody => dispatch => {
    dispatch(editReportAutoDeleteSettingsRequest());

    return axios
        .patch(`${API_URL}/companies`, postBody, getHeaders())
        .then(res => dispatch(editReportAutoDeleteSettingsSuccess(res.data)))
        .catch(err => dispatch(editReportAutoDeleteSettingsFailure(err.message)));
};
