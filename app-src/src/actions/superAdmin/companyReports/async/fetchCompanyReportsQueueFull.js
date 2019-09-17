import axios from 'axios';

import {
    ADMIN_FETCH_COMPANY_REPORTS_FULL_REQUEST,
    ADMIN_FETCH_COMPANY_REPORTS_FULL_SUCCESS,
    ADMIN_FETCH_COMPANY_REPORTS_FULL_FAILURE
} from 'constants/actionTypes/companyReports';
import { ADMIN_API_URL } from 'config';
import { getHeaders } from 'helpers/api';

export const fetchCompanyReportsFullRequest = () => ({
    type: ADMIN_FETCH_COMPANY_REPORTS_FULL_REQUEST
});

export const fetchCompanyReportsFullSuccess = payload => ({
    type: ADMIN_FETCH_COMPANY_REPORTS_FULL_SUCCESS,
    payload
});

export const fetchCompanyReportsFullFailure = error => ({
    type: ADMIN_FETCH_COMPANY_REPORTS_FULL_FAILURE,
    error
});

// TODO: reducer

export default () => dispatch => {
    dispatch(fetchCompanyReportsFullRequest());
    axios
        .get(`${ADMIN_API_URL}/reports`, getHeaders())
        .then(({ data }) => dispatch(fetchCompanyReportsFullSuccess(data)))
        .catch(err => dispatch(fetchCompanyReportsFullFailure(err.message)));
};
