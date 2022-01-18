import axios from 'axios';

import {
    MARK_BUG_REPORT_FAILURE,
    MARK_BUG_REPORT_REQUEST,
    MARK_BUG_REPORT_SUCCESS,
} from 'constants/actionTypes/bugReports';
import { ADMIN_API_URL } from 'config';
import { getHeaders } from 'helpers/api';

export const markBugReportStatusListRequest = () => ({
    type: MARK_BUG_REPORT_REQUEST,
});

export const markBugReportStatusListSuccess = payload => ({
    type: MARK_BUG_REPORT_SUCCESS,
    payload,
});

export const markBugReportStatusListFailure = error => ({
    type: MARK_BUG_REPORT_FAILURE,
    error,
});

export default id => dispatch => {
    dispatch(markBugReportStatusListRequest());

    return axios
        .patch(`${ADMIN_API_URL}/bugReports/${id}/isRead`, {}, getHeaders())
        .then(res => dispatch(markBugReportStatusListSuccess(res.data)))
        .catch(err => dispatch(markBugReportStatusListFailure(err.message)));
};
