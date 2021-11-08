import axios from 'axios';

import {
    DELETE_BUG_REPORT_REQUEST,
    DELETE_BUG_REPORT_SUCCESS,
    DELETE_BUG_REPORT_FAILURE,
} from 'constants/actionTypes/bugReports';
import { ADMIN_API_URL } from 'config';
import { getHeaders } from 'helpers/api';

export const deleteBugReportRequest = () => ({
    type: DELETE_BUG_REPORT_REQUEST,
});

export const deleteBugReportSuccess = payload => ({
    type: DELETE_BUG_REPORT_SUCCESS,
    payload,
});

export const deleteBugReportFailure = error => ({
    type: DELETE_BUG_REPORT_FAILURE,
    error,
});

export default reportID => dispatch => {
    dispatch(deleteBugReportRequest());

    return axios
        .delete(`${ADMIN_API_URL}/bugReports/${reportID}`, getHeaders())
        .then(res => dispatch(deleteBugReportSuccess(res.data)))
        .catch(err => dispatch(deleteBugReportFailure(err.message)));
};
