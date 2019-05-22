import axios from 'axios';

import {
    CLIENT_FETCH_COMPANY_SETTINGS_REQUEST,
    CLIENT_FETCH_COMPANY_SETTINGS_SUCCESS,
    CLIENT_FETCH_COMPANY_SETTINGS_FAILURE
} from 'constants/client/actionTypes/clientSelectCompany';
import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';

export const clientFetchCompaniesRequest = () => ({
    type: CLIENT_FETCH_COMPANY_SETTINGS_REQUEST
});

export const clientFetchCompaniesSuccess = payload => ({
    type: CLIENT_FETCH_COMPANY_SETTINGS_SUCCESS,
    payload
});

export const clientFetchCompaniesFailure = error => ({
    type: CLIENT_FETCH_COMPANY_SETTINGS_FAILURE,
    error
});

export default () => dispatch => {
    dispatch(clientFetchCompaniesRequest());

    axios
        // ! change this url
        .get(`${API_URL}/settings`, getHeaders())
        .then(res => dispatch(clientFetchCompaniesSuccess(res.data)))
        .catch(err => dispatch(clientFetchCompaniesFailure(err.message)));
};
