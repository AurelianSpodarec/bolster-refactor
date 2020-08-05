import axios from 'axios';

import { ADMIN_API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import {
    ADMIN_DELETE_REPORT_REQUEST,
    ADMIN_DELETE_REPORT_SUCCESS,
    ADMIN_DELETE_REPORT_FAILURE,
} from 'constants/actionTypes/companyReports';

export const deleteReportRequest = () => ({
    type: ADMIN_DELETE_REPORT_REQUEST,
});

export const deleteReportSuccess = payload => ({
    type: ADMIN_DELETE_REPORT_SUCCESS,
    payload,
    success: true,
});

export const deleteReportFailure = error => ({
    type: ADMIN_DELETE_REPORT_FAILURE,
    error,
    success: false,
});

export default id => dispatch => {
    dispatch(deleteReportRequest());

    return axios
        .delete(`${ADMIN_API_URL}/reports/${id}`, getHeaders())
        .then(({ data }) => {
            return dispatch(deleteReportSuccess(data));
        })
        .catch(err => {
            return dispatch(deleteReportFailure(err.message));
        });
};
