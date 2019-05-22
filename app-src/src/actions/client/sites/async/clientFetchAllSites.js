import axios from 'axios';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import {
    CLIENT_FETCH_ALL_SITES_REQUEST,
    CLIENT_FETCH_ALL_SITES_SUCCESS,
    CLIENT_FETCH_ALL_SITES_FAILURE
} from 'constants/client/actionTypes/clientSites';

export const clientFetchAllSitesRequest = () => ({
    type: CLIENT_FETCH_ALL_SITES_REQUEST
});

export const clientFetchAllSitesSuccess = payload => ({
    type: CLIENT_FETCH_ALL_SITES_SUCCESS,
    payload
});

export const clientFetchAllSitesFailure = error => ({
    type: CLIENT_FETCH_ALL_SITES_FAILURE,
    error
});

export default () => dispatch => {
    dispatch(clientFetchAllSitesRequest());

    axios
        // ! change the url
        .get(`${API_URL}/sites `, getHeaders())
        .then(res => dispatch(clientFetchAllSitesSuccess(res.data)))
        .catch(err => dispatch(clientFetchAllSitesFailure(err.message)));
};
