import { combineReducers } from 'redux';

import {
    FETCH_LATEST_APP_VERSION_REQUEST,
    FETCH_LATEST_APP_VERSION_SUCCESS,
    FETCH_LATEST_APP_VERSION_FAILURE,
} from 'constants/actionTypes/app';

export default combineReducers({
    appVersion: appVersionReducer,
    isFetching: isFetchingReducer,
    error: errorReducer,
});

function isFetchingReducer(state = false, action) {
    switch (action.type) {
        case FETCH_LATEST_APP_VERSION_REQUEST:
            return true;
        case FETCH_LATEST_APP_VERSION_SUCCESS:
        case FETCH_LATEST_APP_VERSION_FAILURE:
            return false;
        default:
            return state;
    }
}

function errorReducer(state = null, action) {
    switch (action.type) {
        case FETCH_LATEST_APP_VERSION_REQUEST:
            return null;
        case FETCH_LATEST_APP_VERSION_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function appVersionReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_LATEST_APP_VERSION_SUCCESS:
            return action.payload;
        default:
            return state;
    }
}
