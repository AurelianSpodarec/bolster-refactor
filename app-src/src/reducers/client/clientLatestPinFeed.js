import { combineReducers } from 'redux';

import {
    CLIENT_FETCH_PIN_FEED_REQUEST,
    CLIENT_FETCH_PIN_FEED_SUCCESS,
    CLIENT_FETCH_PIN_FEED_FAILURE
} from 'constants/client/actionTypes/clientPins';

export default combineReducers({
    pins: latestPinFeedReducer,
    isFetching: isFetchingReducer,
    error: errorReducer,
    lastUpdatedOn: lastUpdatedOnReducer
});

function isFetchingReducer(state = false, action) {
    switch (action.type) {
        case CLIENT_FETCH_PIN_FEED_REQUEST:
            return true;
        case CLIENT_FETCH_PIN_FEED_SUCCESS:
        case CLIENT_FETCH_PIN_FEED_FAILURE:
            return false;
        default:
            return state;
    }
}

function errorReducer(state = null, action) {
    switch (action.type) {
        case CLIENT_FETCH_PIN_FEED_REQUEST:
            return null;
        case CLIENT_FETCH_PIN_FEED_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function latestPinFeedReducer(state = [], action) {
    switch (action.type) {
        case CLIENT_FETCH_PIN_FEED_SUCCESS:
            return action.payload.items;
        default:
            return state;
    }
}

function lastUpdatedOnReducer(state = null, action) {
    switch (action.type) {
        case CLIENT_FETCH_PIN_FEED_SUCCESS:
            return action.payload.updatedOn;
        default:
            return state;
    }
}
