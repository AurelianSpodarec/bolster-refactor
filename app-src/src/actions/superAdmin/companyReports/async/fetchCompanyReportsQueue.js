import axios from 'axios';

import {
    ADMIN_FETCH_COMPANY_REPORTS_REQUEST,
    ADMIN_FETCH_COMPANY_REPORTS_SUCCESS,
    ADMIN_FETCH_COMPANY_REPORTS_FAILURE
} from 'constants/actionTypes/companyReports';
import { ADMIN_API_URL } from 'config';
import { getHeaders } from 'helpers/api';

export const fetchCompanyReportsRequest = () => ({
    type: ADMIN_FETCH_COMPANY_REPORTS_REQUEST
});

export const fetchCompanyReportsSuccess = payload => ({
    type: ADMIN_FETCH_COMPANY_REPORTS_SUCCESS,
    payload
});

export const fetchCompanyReportsFailure = error => ({
    type: ADMIN_FETCH_COMPANY_REPORTS_FAILURE,
    error
});

// TODO: reducer

export default () => dispatch => {
    dispatch(fetchCompanyReportsRequest());
    axios
        .get(`${ADMIN_API_URL}/reports`, getHeaders())
        .then(({ data }) => dispatch(fetchCompanyReportsSuccess(data)))
        .catch(err => dispatch(fetchCompanyReportsFailure(err.message)));
};
