import { combineReducers } from 'redux';
import {
    FETCH_PIN_STATS_REQUEST,
    FETCH_PIN_STATS_SUCCESS,
    FETCH_PIN_STATS_FAILURE,
    POST_FILTER_PIN_STATS_REQUEST,
    POST_FILTER_PIN_STATS_SUCCESS,
    POST_FILTER_PIN_STATS_FAILURE,
} from 'constants/actionTypes/stats';

export default combineReducers({
    error: errorReducer,
    isFetching: isFetchingReducer,
    stats: statsReducer,
    postFilterErrors: errorFiltersReducer,
    isPostingFilters: isPostingFiltersReducer,
    filteredStats: filteredStatsReducer,
    filteredStatsBool: filteredStatsBoolReducer,
});

function isFetchingReducer(state = false, action) {
    switch (action.type) {
        case FETCH_PIN_STATS_REQUEST:
            return true;
        case FETCH_PIN_STATS_SUCCESS:
        case FETCH_PIN_STATS_FAILURE:
            return false;
        default:
            return state;
    }
}

function errorReducer(state = null, action) {
    switch (action.type) {
        case FETCH_PIN_STATS_REQUEST:
            return null;

        case FETCH_PIN_STATS_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function statsReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_PIN_STATS_REQUEST:
            return {};
        case FETCH_PIN_STATS_SUCCESS:
            return action.payload;
        default:
            return state;
    }
}

function isPostingFiltersReducer(state = false, action) {
    switch (action.type) {
        case POST_FILTER_PIN_STATS_REQUEST:
            return true;
        case POST_FILTER_PIN_STATS_SUCCESS:
        case POST_FILTER_PIN_STATS_FAILURE:
            return false;
        default:
            return state;
    }
}

function errorFiltersReducer(state = null, action) {
    switch (action.type) {
        case POST_FILTER_PIN_STATS_REQUEST:
            return null;

        case POST_FILTER_PIN_STATS_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function filteredStatsReducer(state = {}, action) {
    switch (action.type) {
        case POST_FILTER_PIN_STATS_REQUEST:
        case POST_FILTER_PIN_STATS_FAILURE:
            return {};
        case POST_FILTER_PIN_STATS_SUCCESS:
            return action.payload;
        default:
            return state;
    }
}

function filteredStatsBoolReducer(state = false, action) {
    switch (action.type) {
        case POST_FILTER_PIN_STATS_FAILURE:
            return false;
        case POST_FILTER_PIN_STATS_SUCCESS:
            return true;
        default:
            return state;
    }
}
