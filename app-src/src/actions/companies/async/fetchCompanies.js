import axios from 'axios';

import {
    FETCH_COMPANIES_REQUEST,
    FETCH_COMPANIES_SUCCESS,
    FETCH_COMPANIES_FAILURE
} from 'constants/actionTypes/companies';
import { ADMIN_API_URL } from 'config';

export const fetchCompaniesRequest = () => ({
    type: FETCH_COMPANIES_REQUEST
});

export const fetchCompaniesSuccess = payload => ({
    type: FETCH_COMPANIES_SUCCESS,
    payload
});

export const fetchCompaniesFailure = error => ({
    type: FETCH_COMPANIES_FAILURE,
    error
});

export default () => dispatch => {
    dispatch(fetchCompaniesRequest());

    axios
        .get(`${ADMIN_API_URL}/companies`)
        .then(res => dispatch(fetchCompaniesSuccess(res.data)))
        .catch(err => dispatch(fetchCompaniesFailure(err.message)));
};
