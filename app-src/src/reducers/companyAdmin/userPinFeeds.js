import { combineReducers } from 'redux';

import {
    FETCH_USER_PIN_FEEDS_REQUEST,
    FETCH_USER_PIN_FEEDS_SUCCESS,
    FETCH_USER_PIN_FEEDS_FAILURE,
} from 'constants/actionTypes/pins';

export default combineReducers({
    userPinFeeds: userPinFeedsReducer,
    isFetching: isFetchingReducer,
    error: errorReducer,
});

function isFetchingReducer(state = false, action) {
    switch (action.type) {
        case FETCH_USER_PIN_FEEDS_REQUEST:
            return true;
        case FETCH_USER_PIN_FEEDS_SUCCESS:
            return false;
        case FETCH_USER_PIN_FEEDS_FAILURE:
            return false;

        default:
            return state;
    }
}

function errorReducer(state = null, action) {
    switch (action.type) {
        case FETCH_USER_PIN_FEEDS_REQUEST:
            return null;
        case FETCH_USER_PIN_FEEDS_FAILURE:
            return action.error;

        default:
            return state;
    }
}

function userPinFeedsReducer(state = [], action) {
    switch (action.type) {
        case FETCH_USER_PIN_FEEDS_SUCCESS:
            return action.payload;
        default:
            return state;
    }
}
