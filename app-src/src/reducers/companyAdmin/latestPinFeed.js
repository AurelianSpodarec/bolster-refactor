import { combineReducers } from 'redux';

import {
    FETCH_PIN_FEED_REQUEST,
    FETCH_PIN_FEED_SUCCESS,
    FETCH_PIN_FEED_FAILURE
} from 'constants/actionTypes/pins';

export default combineReducers({
    pins: latestPinFeedReducer,
    isFetching: isFetchingReducer,
    error: errorReducer,
    lastUpdatedOn: lastUpdatedOnReducer
});

function isFetchingReducer(state = false, action) {
    switch (action.type) {
        case FETCH_PIN_FEED_REQUEST:
            return true;
        case FETCH_PIN_FEED_SUCCESS:
        case FETCH_PIN_FEED_FAILURE:
            return false;
        default:
            return state;
    }
}

function errorReducer(state = null, action) {
    switch (action.type) {
        case FETCH_PIN_FEED_REQUEST:
            return null;
        case FETCH_PIN_FEED_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function latestPinFeedReducer(state = [], action) {
    switch (action.type) {
        case FETCH_PIN_FEED_SUCCESS:
            return action.payload.items;
        default:
            return state;
    }
}

function lastUpdatedOnReducer(state = null, action) {
    switch (action.type) {
        case FETCH_PIN_FEED_SUCCESS:
            return action.payload.updatedOn;
        default:
            return state;
    }
}
