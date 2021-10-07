import { combineReducers } from 'redux';

import {
    FETCH_USER_PIN_FEED_REQUEST,
    FETCH_USER_PIN_FEED_SUCCESS,
    FETCH_USER_PIN_FEED_FAILURE,
} from 'constants/actionTypes/pins';

export default combineReducers({
    pins: userPinFeedReducer,
    isFetching: isFetchingReducer,
    error: errorReducer,
});

function isFetchingReducer(state = false, action) {
    switch (action.type) {
        case FETCH_USER_PIN_FEED_REQUEST:
            return true;
        case FETCH_USER_PIN_FEED_SUCCESS:
            return false;
        case FETCH_USER_PIN_FEED_FAILURE:
            return false;

        default:
            return state;
    }
}

function errorReducer(state = null, action) {
    switch (action.type) {
        case FETCH_USER_PIN_FEED_REQUEST:
            return null;
        case FETCH_USER_PIN_FEED_FAILURE:
            return action.error;

        default:
            return state;
    }
}

function userPinFeedReducer(state = null, action) {
    switch (action.type) {
        case FETCH_USER_PIN_FEED_SUCCESS:
            return action.payload.items;
        default:
            return state;
    }
}
