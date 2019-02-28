import axios from 'axios';

import {
    FETCH_SITES_REQUEST,
    FETCH_SITES_SUCCESS,
    FETCH_SITES_FAILURE
} from 'constants/actionTypes/sites';

export const fetchSitesRequest = () => ({
    type: FETCH_SITES_REQUEST
});

export const fetchSitesSuccess = payload => ({
    type: FETCH_SITES_SUCCESS,
    payload
});

export const fetchSitesFailure = error => ({
    type: FETCH_SITES_FAILURE,
    error
});

export default () => dispatch => {
    dispatch(fetchSitesRequest());

    axios
        .get('mockData/sites/sites.json')
        .then(res => dispatch(fetchSitesSuccess(res.data)))
        .catch(err => dispatch(fetchSitesFailure(err)));
};
