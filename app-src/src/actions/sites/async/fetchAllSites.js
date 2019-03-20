import axios from 'axios';
import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';

import {
    FETCH_ALL_SITES_REQUEST,
    FETCH_ALL_SITES_SUCCESS,
    FETCH_ALL_SITES_FAILURE
} from 'constants/actionTypes/sites';

export const fetchAllSitesRequest = () => ({
    type: FETCH_ALL_SITES_REQUEST
});

export const fetchAllSitesSuccess = payload => ({
    type: FETCH_ALL_SITES_SUCCESS,
    payload
});

export const fetchAllSitesFailure = error => ({
    type: FETCH_ALL_SITES_FAILURE,
    error
});

export default () => dispatch => {
    dispatch(fetchAllSitesRequest());

    axios
        .get(`${API_URL}/sites `, getHeaders())
        .then(res => dispatch(fetchAllSitesSuccess(res.data)))
        .catch(err => dispatch(fetchAllSitesFailure(err.message)));
};
