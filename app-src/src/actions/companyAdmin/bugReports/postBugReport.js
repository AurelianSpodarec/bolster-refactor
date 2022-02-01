import axios from 'axios';

import {
    CREATE_BUG_REPORT_REQUEST,
    CREATE_BUG_REPORT_SUCCESS,
    CREATE_BUG_REPORT_FAILURE,
} from 'constants/actionTypes/bugReports';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';

export const createBugReportRequest = () => ({
    type: CREATE_BUG_REPORT_REQUEST,
});

export const createBugReportSuccess = payload => ({
    type: CREATE_BUG_REPORT_SUCCESS,
    payload,
});

export const createBugReportFailure = error => ({
    type: CREATE_BUG_REPORT_FAILURE,
    error,
});

export default postBody => dispatch => {
    dispatch(createBugReportRequest());

    return axios
        .post(`${API_URL}/bugReports`, postBody, getHeaders())
        .then(res => dispatch(createBugReportSuccess(res.data)))
        .catch(err => dispatch(createBugReportFailure(err.message)));
};
