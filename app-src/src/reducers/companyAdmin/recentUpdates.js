import { combineReducers } from 'redux';

import {
    FETCH_RECENT_UPDATES_REQUEST,
    FETCH_RECENT_UPDATES_SUCCESS,
    FETCH_RECENT_UPDATES_FAILURE,
} from 'constants/actionTypes/recentUpdates';

import { convertArrToObj } from 'helpers/generic';

export default combineReducers({
    updates: updatesReducer,
    isFetching: isFetchingReducer,
    error: errorReducer,
    success: successReducer,
});

function isFetchingReducer(state = false, action) {
    switch (action.type) {
        case FETCH_RECENT_UPDATES_REQUEST:
            return true;
        case FETCH_RECENT_UPDATES_SUCCESS:
        case FETCH_RECENT_UPDATES_FAILURE:
            return false;
        default:
            return state;
    }
}

function errorReducer(state = null, action) {
    switch (action.type) {
        case FETCH_RECENT_UPDATES_REQUEST:
            return null;
        case FETCH_RECENT_UPDATES_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function successReducer(state = false, action) {
    switch (action.type) {
        case FETCH_RECENT_UPDATES_REQUEST:
            return false;
        case FETCH_RECENT_UPDATES_SUCCESS:
            return true;
        default:
            return state;
    }
}

function updatesReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_RECENT_UPDATES_SUCCESS:
            return convertArrToObj(action.payload);
        default:
            return state;
    }
}
