import { combineReducers } from 'redux';
import {
    FETCH_LIVE_HISTORIES_REQUEST,
    FETCH_LIVE_HISTORIES_SUCCESS,
    FETCH_LIVE_HISTORIES_FAILURE,
    FETCH_HISTORY_FEED_REQUEST,
    FETCH_HISTORY_FEED_SUCCESS,
    FETCH_HISTORY_FEED_FAILURE
} from 'constants/actionTypes/stats';

export default combineReducers({
    error: errorReducer,
    isInitialFetching: isInitialFetchingReducer,
    isLiveFetching: isLiveFetchingReducer,
    liveHistories: liveHistoriesReducer
});

function isInitialFetchingReducer(state = false, action) {
    switch (action.type) {
        case FETCH_HISTORY_FEED_REQUEST:
            return true;
        case FETCH_HISTORY_FEED_SUCCESS:
        case FETCH_HISTORY_FEED_FAILURE:
        case FETCH_LIVE_HISTORIES_REQUEST:
            return false;
        default:
            return state;
    }
}
function isLiveFetchingReducer(state = false, action) {
    switch (action.type) {
        case FETCH_LIVE_HISTORIES_REQUEST:
            return true;
        case FETCH_LIVE_HISTORIES_SUCCESS:
        case FETCH_HISTORY_FEED_REQUEST:
            return false;
        default:
            return state;
    }
}
function errorReducer(state = null, action) {
    switch (action.type) {
        case FETCH_HISTORY_FEED_REQUEST:
        case FETCH_LIVE_HISTORIES_REQUEST:
            return null;
        case FETCH_HISTORY_FEED_FAILURE:
        case FETCH_LIVE_HISTORIES_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function liveHistoriesReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_HISTORY_FEED_SUCCESS:
            return {
                updatedOn: action.payload.updatedOn,
                items: { ...state.items }
            };
        case FETCH_LIVE_HISTORIES_SUCCESS:
            //update state with new pins
            return {
                updatedOn: action.payload.updatedOn,
                items: { ...state.items }
            };
        default:
            return state;
    }
}
