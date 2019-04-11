import axios from 'axios';

import {
    FETCH_ALL_COMPANIES_REQUEST,
    FETCH_ALL_COMPANIES_SUCCESS,
    FETCH_ALL_COMPANIES_FAILURE
} from 'constants/actionTypes/companiesWithPermissions';
import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';

export const fetchAllCompaniesRequest = () => ({
    type: FETCH_ALL_COMPANIES_REQUEST
});

export const fetchAllCompaniesSuccess = payload => ({
    type: FETCH_ALL_COMPANIES_SUCCESS,
    payload
});

export const fetchAllCompaniesFailure = error => ({
    type: FETCH_ALL_COMPANIES_FAILURE,
    error
});

export default () => dispatch => {
    dispatch(fetchAllCompaniesRequest());

    axios
        .get(`${API_URL}/companies`, getHeaders())
        .then(res => dispatch(fetchAllCompaniesSuccess(res.data)))
        .catch(err => dispatch(fetchAllCompaniesFailure(err.message)));
};
