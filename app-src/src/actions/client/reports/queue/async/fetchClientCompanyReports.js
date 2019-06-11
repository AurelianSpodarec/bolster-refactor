import axios from 'axios';

import { CLIENT_API_URL } from 'config/index';
import { getHeaders } from 'helpers/api';

import {
    CLIENT_FETCH_COMPANY_REPORTS_REQUEST,
    CLIENT_FETCH_COMPANY_REPORTS_SUCCESS,
    CLIENT_FETCH_COMPANY_REPORTS_FAILURE
} from 'constants/client/actionTypes/clientCompanyReports';

export const fetchClientCompanyReportsRequest = () => ({
    type: CLIENT_FETCH_COMPANY_REPORTS_REQUEST
});

export const fetchClientCompanyReportsSuccess = payload => ({
    type: CLIENT_FETCH_COMPANY_REPORTS_SUCCESS,
    payload
});

export const fetchClientCompanyReportsFailure = error => ({
    type: CLIENT_FETCH_COMPANY_REPORTS_FAILURE,
    error
});

export default companyID => dispatch => {
    dispatch(fetchClientCompanyReportsRequest());

    return axios
        .get(`${CLIENT_API_URL}/reports/${companyID}`, getHeaders())
        .then(res => dispatch(fetchClientCompanyReportsSuccess(res.data)))
        .catch(err => dispatch(fetchClientCompanyReportsFailure(err.message)));
};
