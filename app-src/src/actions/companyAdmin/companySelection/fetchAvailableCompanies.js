import axios from 'axios';
import { getHeaders } from 'helpers/api';

import {
    FETCH_AVAILABLE_COMPANIES_REQUEST,
    FETCH_AVAILABLE_COMPANIES_SUCCESS,
    FETCH_AVAILABLE_COMPANIES_FAILURE,
} from 'constants/actionTypes/companies';
import { AUTH_API_URL } from 'config';

export const fetchAvailableCompaniesRequest = () => ({
    type: FETCH_AVAILABLE_COMPANIES_REQUEST,
});

export const fetchAvailableCompaniesSuccess = payload => ({
    type: FETCH_AVAILABLE_COMPANIES_SUCCESS,
    payload,
});

export const fetchAvailableCompaniesFailure = error => ({
    type: FETCH_AVAILABLE_COMPANIES_FAILURE,
    error,
});

export default () => dispatch => {
    dispatch(fetchAvailableCompaniesRequest());

    // todo request
    return axios
        .get(`${AUTH_API_URL}/auth/companyUsers`, getHeaders())
        .then(res => dispatch(fetchAvailableCompaniesSuccess(res.data)))
        .catch(err => dispatch(fetchAvailableCompaniesFailure(err.message)));
};
