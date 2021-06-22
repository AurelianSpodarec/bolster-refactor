import axios from 'axios';

import {
    FETCH_COMPANY_REPORT_SINGLE_REQUEST,
    FETCH_COMPANY_REPORT_SINGLE_SUCCESS,
    FETCH_COMPANY_REPORT_SINGLE_FAILURE,
} from 'constants/actionTypes/companyReports';
import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';

export const fetchCompanyReportSingleRequest = () => ({
    type: FETCH_COMPANY_REPORT_SINGLE_REQUEST,
});

export const fetchCompanyReportSingleSuccess = payload => ({
    type: FETCH_COMPANY_REPORT_SINGLE_SUCCESS,
    payload,
});

export const fetchCompanyReportSingleFailure = error => ({
    type: FETCH_COMPANY_REPORT_SINGLE_FAILURE,
    error,
});

export default reportID => dispatch => {
    dispatch(fetchCompanyReportSingleRequest());
    return axios
        .get(`${API_URL}/reports/${reportID}`, getHeaders())
        .then(({ data }) => dispatch(fetchCompanyReportSingleSuccess(data)))
        .catch(err => dispatch(fetchCompanyReportSingleFailure(err.message)));
};
