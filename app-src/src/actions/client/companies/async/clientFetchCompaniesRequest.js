import axios from 'axios';

import {
    CLIENT_FETCH_COMPANIES_REQUEST,
    CLIENT_FETCH_COMPANIES_SUCCESS,
    CLIENT_FETCH_COMPANIES_FAILURE
} from 'constants/client/actionTypes/clientSelectCompany';
import { CLIENT_API_URL } from 'config/index';
import { getHeaders } from 'helpers/api';

export const clientFetchCompaniesRequest = () => ({
    type: CLIENT_FETCH_COMPANIES_REQUEST
});

export const clientFetchCompaniesSuccess = payload => ({
    type: CLIENT_FETCH_COMPANIES_SUCCESS,
    payload
});

export const clientFetchCompaniesFailure = error => ({
    type: CLIENT_FETCH_COMPANIES_FAILURE,
    error
});

export default () => dispatch => {
    dispatch(clientFetchCompaniesRequest());

    axios
        // ! change this url
        .get(`${CLIENT_API_URL}/companies`, getHeaders())
        .then(res => dispatch(clientFetchCompaniesSuccess(res.data)))
        .catch(err => dispatch(clientFetchCompaniesFailure(err.message)));
};
