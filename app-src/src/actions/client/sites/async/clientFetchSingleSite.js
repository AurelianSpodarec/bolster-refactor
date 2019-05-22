import axios from 'axios';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import {
    CLIENT_FETCH_SINGLE_SITE_REQUEST,
    CLIENT_FETCH_SINGLE_SITE_SUCCESS,
    CLIENT_FETCH_SINGLE_SITE_FAILURE
} from 'constants/actionTypes/sites';

export const clientFetchSiteRequest = () => ({
    type: CLIENT_FETCH_SINGLE_SITE_REQUEST
});

export const clientFetchSiteSuccess = payload => ({
    type: CLIENT_FETCH_SINGLE_SITE_SUCCESS,
    payload
});

export const clientFetchSiteFailure = error => ({
    type: CLIENT_FETCH_SINGLE_SITE_FAILURE,
    error
});

export default id => dispatch => {
    dispatch(clientFetchSiteRequest());

    return axios
        .get(`${API_URL}/sites/${id}`, getHeaders())
        .then(res => dispatch(clientFetchSiteSuccess(res.data)))
        .catch(err => dispatch(clientFetchSiteFailure(err.message)));
};
