import { combineReducers } from 'redux';

import { convertArrToObj } from 'helpers/generic';
import {
    CLIENT_FETCH_SEARCH_RESULTS_REQUEST,
    CLIENT_FETCH_SEARCH_RESULTS_SUCCESS,
    CLIENT_FETCH_SEARCH_RESULTS_FAILURE
} from 'constants/client/actionTypes/clientSearch';

export default combineReducers({
    results: resultsReducer,
    isFetching: isFetchingReducer,
    error: errorReducer
});

function isFetchingReducer(state = false, action) {
    switch (action.type) {
        case CLIENT_FETCH_SEARCH_RESULTS_REQUEST:
            return true;
        case CLIENT_FETCH_SEARCH_RESULTS_SUCCESS:
        case CLIENT_FETCH_SEARCH_RESULTS_FAILURE:
            return false;
        default:
            return state;
    }
}

function errorReducer(state = null, action) {
    switch (action.type) {
        case CLIENT_FETCH_SEARCH_RESULTS_REQUEST:
            return null;
        case CLIENT_FETCH_SEARCH_RESULTS_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function resultsReducer(state = {}, action) {
    switch (action.type) {
        case CLIENT_FETCH_SEARCH_RESULTS_SUCCESS:
            return convertArrToObj(
                action.payload.map((res, i) => ({ id: i, ...res }))
            );
        default:
            return state;
    }
}
