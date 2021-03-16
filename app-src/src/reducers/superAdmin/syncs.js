import { combineReducers } from 'redux';

import {
    FETCH_USER_LATEST_SYNC_DATA_REQUEST,
    FETCH_USER_LATEST_SYNC_DATA_SUCCESS,
    FETCH_USER_LATEST_SYNC_DATA_FAILURE,
} from 'constants/actionTypes/syncs';

export default combineReducers({
    syncData: syncDataReducer,
    isFetching: isFetchingReducer,
    error: errorReducer,
});

function isFetchingReducer(state = false, action) {
    switch (action.type) {
        case FETCH_USER_LATEST_SYNC_DATA_REQUEST:
            return true;
        case FETCH_USER_LATEST_SYNC_DATA_SUCCESS:
        case FETCH_USER_LATEST_SYNC_DATA_FAILURE:
            return false;
        default:
            return state;
    }
}

function errorReducer(state = null, action) {
    switch (action.type) {
        case FETCH_USER_LATEST_SYNC_DATA_REQUEST:
            return null;
        case FETCH_USER_LATEST_SYNC_DATA_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function syncDataReducer(state = [], action) {
    switch (action.type) {
        case FETCH_USER_LATEST_SYNC_DATA_REQUEST:
            return [];
        case FETCH_USER_LATEST_SYNC_DATA_SUCCESS:
            return action.payload;
        default:
            return state;
    }
}
