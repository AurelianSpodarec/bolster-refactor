import axios from 'axios';

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

export default () => dispatch => {
    dispatch(fetchSiteRequest());

    axios
        .get('/mockData/sites/site.json')
        .then(res => dispatch(fetchSiteSuccess(res.data)))
        .catch(err => dispatch(fetchSiteFailure(err)));
};
