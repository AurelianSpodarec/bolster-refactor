import axios from 'axios';

import { ADMIN_API_URL } from 'config';
import { getHeaders, handleErrors } from 'helpers/api';
import {
    ADMIN_RETRY_REPORT_REQUEST,
    ADMIN_RETRY_REPORT_SUCCESS,
    ADMIN_RETRY_REPORT_FAILURE
} from 'constants/actionTypes/companyReports';

export const retryReportRequest = () => ({
    type: ADMIN_RETRY_REPORT_REQUEST
});

export const retryReportSuccess = payload => ({
    type: ADMIN_RETRY_REPORT_SUCCESS,
    payload
});

export const retryReportFailure = error => ({
    type: ADMIN_RETRY_REPORT_FAILURE,
    error
});

export default id => dispatch => {
    dispatch(retryReportRequest());

    return axios
        .get(`${ADMIN_API_URL}/reports/${id}/retry`, getHeaders())
        .then(({ data }) => {
            return dispatch(retryReportSuccess(data));
        })
        .catch(err => {
            return dispatch(handleErrors(retryReportFailure)(err));
        });
};
