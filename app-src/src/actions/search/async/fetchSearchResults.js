import axios from 'axios';

import {
    FETCH_SEARCH_RESULTS_REQUEST,
    FETCH_SEARCH_RESULTS_SUCCESS,
    FETCH_SEARCH_RESULTS_FAILURE
} from 'constants/actionTypes/search';

export const fetchSearchResultsRequest = () => ({
    type: FETCH_SEARCH_RESULTS_REQUEST
});

export const fetchSearchResultsSuccess = payload => ({
    type: FETCH_SEARCH_RESULTS_SUCCESS,
    payload
});

export const fetchSearchResultsFailure = err => ({
    type: FETCH_SEARCH_RESULTS_FAILURE,
    err
});

export default () => dispatch => {
    dispatch(fetchSearchResultsRequest());

    axios
        .get('mockData/search/results.json')
        .then(res => dispatch(fetchSearchResultsSuccess(res.data)))
        .catch(err => dispatch(fetchSearchResultsFailure(err.message)));
};
