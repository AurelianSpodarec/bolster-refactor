import axios from 'axios';

import { API_URL } from 'config';
import { getHeaders, handleErrors } from 'helpers/api';
import {
    RETRY_REPORT_REQUEST,
    RETRY_REPORT_SUCCESS,
    RETRY_REPORT_FAILURE
} from 'constants/actionTypes/reports';

export const retryReportRequest = () => ({
    type: RETRY_REPORT_REQUEST
});

export const retryReportSuccess = payload => ({
    type: RETRY_REPORT_SUCCESS,
    payload
});

export const retryReportFailure = error => ({
    type: RETRY_REPORT_FAILURE,
    error
});

export default id => dispatch => {
    dispatch(retryReportRequest());

    return axios
        .get(`${API_URL}/reports/${id}/retry`, getHeaders())
        .then(({ data }) => {
            return dispatch(retryReportSuccess(data));
        })
        .catch(err => {
            return dispatch(handleErrors(retryReportFailure)(err));
        });
};
