import axios from 'axios';

import { CLIENT_API_URL } from 'config/index';
import { getHeaders } from 'helpers/api';

import {
    CLIENT_FETCH_COMPANY_REPORTS_FULL_REQUEST,
    CLIENT_FETCH_COMPANY_REPORTS_FULL_SUCCESS,
    CLIENT_FETCH_COMPANY_REPORTS_FULL_FAILURE
} from 'constants/client/actionTypes/clientCompanyReports';

export const fetchClientCompanyReportsFullRequest = () => ({
    type: CLIENT_FETCH_COMPANY_REPORTS_FULL_REQUEST
});

export const fetchClientCompanyReportsFullSuccess = payload => ({
    type: CLIENT_FETCH_COMPANY_REPORTS_FULL_SUCCESS,
    payload
});

export const fetchClientCompanyReportsFullFailure = error => ({
    type: CLIENT_FETCH_COMPANY_REPORTS_FULL_FAILURE,
    error
});

export default companyID => dispatch => {
    dispatch(fetchClientCompanyReportsFullRequest());

    return axios
        .get(`${CLIENT_API_URL}/reports/${companyID}/full`, getHeaders())
        .then(res => dispatch(fetchClientCompanyReportsFullSuccess(res.data)))
        .catch(err => dispatch(fetchClientCompanyReportsFullFailure(err.message)));
};
