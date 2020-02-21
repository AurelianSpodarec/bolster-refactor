import { combineReducers } from 'redux';

import { convertArrToObj } from 'helpers/generic';
import {
    FETCH_SEARCH_RESULTS_REQUEST,
    FETCH_SEARCH_RESULTS_SUCCESS,
    FETCH_SEARCH_RESULTS_FAILURE,
    CLEAR_SEARCH_RESULTS,
} from 'constants/actionTypes/search';

export default combineReducers({
    results: resultsReducer,
    isFetching: isFetchingReducer,
    error: errorReducer
});

function isFetchingReducer(state = false, action) {
    switch (action.type) {
        case FETCH_SEARCH_RESULTS_REQUEST:
            return true;
        case FETCH_SEARCH_RESULTS_SUCCESS:
        case FETCH_SEARCH_RESULTS_FAILURE:
            return false;
        default:
            return state;
    }
}

function errorReducer(state = null, action) {
    switch (action.type) {
        case FETCH_SEARCH_RESULTS_REQUEST:
            return null;
        case FETCH_SEARCH_RESULTS_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function resultsReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_SEARCH_RESULTS_SUCCESS:
            return convertArrToObj(
                action.payload.map((res, i) => ({ id: i, ...res }))
            );
        case CLEAR_SEARCH_RESULTS:
            return {};
        default:
            return state;
    }
}
