import axios from 'axios';

import { API_URL } from 'config';
import { getHeaders, handleErrors } from 'helpers/api';
import {
    GET_COMPANY_REPORT_OPTIONS_REQUEST,
    GET_COMPANY_REPORT_OPTIONS_SUCCESS,
    GET_COMPANY_REPORT_OPTIONS_FAILURE,
} from 'constants/actionTypes/reports';

export const getCompanyReportOptionsRequest = () => ({
    type: GET_COMPANY_REPORT_OPTIONS_REQUEST,
});

export const getCompanyReportOptionsSuccess = payload => ({
    type: GET_COMPANY_REPORT_OPTIONS_SUCCESS,
    payload,
});

export const getCompanyReportOptionsFailure = error => ({
    type: GET_COMPANY_REPORT_OPTIONS_FAILURE,
    error,
});

export default postBody => dispatch => {
    dispatch(getCompanyReportOptionsRequest());

    return axios
        .post(`${API_URL}/reports/companies`, postBody, getHeaders())
        .then(res => dispatch(getCompanyReportOptionsSuccess(res.data)))
        .catch(err => dispatch(handleErrors(getCompanyReportOptionsFailure)(err)));
};
