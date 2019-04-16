import axios from 'axios';

import {
    FETCH_SEARCH_RESULTS_REQUEST,
    FETCH_SEARCH_RESULTS_SUCCESS,
    FETCH_SEARCH_RESULTS_FAILURE
} from 'constants/actionTypes/search';
import { API_URL } from 'config';

export const fetchSearchResultsRequest = () => ({
    type: FETCH_SEARCH_RESULTS_REQUEST
});

export const fetchSearchResultsSuccess = payload => ({
    type: FETCH_SEARCH_RESULTS_SUCCESS,
    payload
});

export const fetchSearchResultsFailure = error => ({
    type: FETCH_SEARCH_RESULTS_FAILURE,
    error
});

export default searchTerm => dispatch => {
    dispatch(fetchSearchResultsRequest());

    axios
        .get(`${API_URL}?searchTerm=${searchTerm}`)
        .then(({ data }) => dispatch(fetchSearchResultsSuccess(data)))
        .catch(err => dispatch(fetchSearchResultsFailure(err.message)));
};
