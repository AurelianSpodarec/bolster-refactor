import axios from 'axios';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';

import {
    FETCH_COMPANY_REPORTS_REQUEST,
    FETCH_COMPANY_REPORTS_SUCCESS,
    FETCH_COMPANY_REPORTS_FAILURE
} from 'constants/actionTypes/companyReports';

export const fetchCompanyReportsFullRequest = () => ({
    type: FETCH_COMPANY_REPORTS_REQUEST
});

export const fetchCompanyReportsFullSuccess = payload => ({
    type: FETCH_COMPANY_REPORTS_SUCCESS,
    payload
});

export const fetchCompanyReportsFullFailure = error => ({
    type: FETCH_COMPANY_REPORTS_FAILURE,
    error
});

export default () => dispatch => {
    dispatch(fetchCompanyReportsFullRequest());

    return axios
        .get(`${API_URL}/reports/full`, getHeaders())
        .then(({ data }) => dispatch(fetchCompanyReportsFullSuccess(data)))
        .catch(err => dispatch(fetchCompanyReportsFullFailure(err.message)));
};
