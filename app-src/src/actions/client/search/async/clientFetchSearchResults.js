import axios from 'axios';

import {
    CLIENT_FETCH_SEARCH_RESULTS_REQUEST,
    CLIENT_FETCH_SEARCH_RESULTS_SUCCESS,
    CLIENT_FETCH_SEARCH_RESULTS_FAILURE
} from 'constants/client/actionTypes/clientSearch';
import { CLIENT_API_URL } from 'config/index';
import { getHeaders } from 'helpers/api';

export const clientFetchSearchResultsRequest = () => ({
    type: CLIENT_FETCH_SEARCH_RESULTS_REQUEST
});

export const clientFetchSearchResultsSuccess = payload => ({
    type: CLIENT_FETCH_SEARCH_RESULTS_SUCCESS,
    payload
});

export const clientFetchSearchResultsFailure = error => ({
    type: CLIENT_FETCH_SEARCH_RESULTS_FAILURE,
    error
});

export default (companyID, searchTerm) => dispatch => {
    dispatch(clientFetchSearchResultsRequest());

    axios
        .get(
            `${CLIENT_API_URL}/search/${companyID}?searchTerm=${searchTerm}`,
            getHeaders()
        )
        .then(({ data }) => dispatch(clientFetchSearchResultsSuccess(data)))
        .catch(err => dispatch(clientFetchSearchResultsFailure(err.message)));
};
