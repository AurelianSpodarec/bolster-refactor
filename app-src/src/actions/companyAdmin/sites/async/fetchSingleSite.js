import axios from 'axios';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import {
    FETCH_SINGLE_SITE_REQUEST,
    FETCH_SINGLE_SITE_SUCCESS,
    FETCH_SINGLE_SITE_FAILURE
} from 'constants/actionTypes/sites';

export const fetchSiteRequest = () => ({
    type: FETCH_SINGLE_SITE_REQUEST
});

export const fetchSiteSuccess = payload => ({
    type: FETCH_SINGLE_SITE_SUCCESS,
    payload
});

export const fetchSiteFailure = error => ({
    type: FETCH_SINGLE_SITE_FAILURE,
    error
});

export default id => dispatch => {
    dispatch(fetchSiteRequest());

    return axios
        .get(`${API_URL}/sites/${id}`, getHeaders())
        .then(res => dispatch(fetchSiteSuccess(res.data)))
        .catch(err => dispatch(fetchSiteFailure(err.message)));
};
