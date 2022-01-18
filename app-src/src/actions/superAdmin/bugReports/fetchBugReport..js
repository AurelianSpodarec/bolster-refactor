import axios from 'axios';

import {
    FETCH_BUG_REPORT_FAILURE,
    FETCH_BUG_REPORT_REQUEST,
    FETCH_BUG_REPORT_SUCCESS,
} from 'constants/actionTypes/bugReports';
import { ADMIN_API_URL } from 'config';
import { getHeaders } from 'helpers/api';

export const fetchBugReportListRequest = () => ({
    type: FETCH_BUG_REPORT_REQUEST,
});

export const fetchBugReportListSuccess = payload => ({
    type: FETCH_BUG_REPORT_SUCCESS,
    payload,
});

export const fetchBugReportListFailure = error => ({
    type: FETCH_BUG_REPORT_FAILURE,
    error,
});

export default id => dispatch => {
    dispatch(fetchBugReportListRequest());

    return axios
        .get(`${ADMIN_API_URL}/bugReports/${id}`, getHeaders())
        .then(res => dispatch(fetchBugReportListSuccess(res.data)))
        .catch(err => dispatch(fetchBugReportListFailure(err.message)));
};
