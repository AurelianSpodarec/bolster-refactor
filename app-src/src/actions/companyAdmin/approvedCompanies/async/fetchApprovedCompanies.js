import axios from 'axios';
import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';

import {
    FETCH_ALL_APPROVED_COMPANIES_REQUEST,
    FETCH_ALL_APPROVED_COMPANIES_SUCCESS,
    FETCH_ALL_APPROVED_COMPANIES_FAILURE
} from 'constants/actionTypes/approvedCompanies';

export const fetchAllApprovedCompaniesRequest = () => ({
    type: FETCH_ALL_APPROVED_COMPANIES_REQUEST
});

export const fetchAllApprovedCompaniesSuccess = payload => ({
    type: FETCH_ALL_APPROVED_COMPANIES_SUCCESS,
    payload
});

export const fetchAllApprovedCompaniesFailure = error => ({
    type: FETCH_ALL_APPROVED_COMPANIES_FAILURE,
    error
});

export default () => dispatch => {
    dispatch(fetchAllApprovedCompaniesRequest());

    axios
        .get(`${API_URL}/companies/approved`, getHeaders())
        .then(res => dispatch(fetchAllApprovedCompaniesSuccess(res.data)))
        .catch(err => dispatch(fetchAllApprovedCompaniesFailure(err.message)));
};
