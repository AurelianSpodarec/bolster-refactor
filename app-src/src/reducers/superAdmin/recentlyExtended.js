import { combineReducers } from 'redux';

import {
    ADMIN_FETCH_RECENTLY_EXTENDED_REQUEST,
    ADMIN_FETCH_RECENTLY_EXTENDED_SUCCESS,
    ADMIN_FETCH_RECENTLY_EXTENDED_FAILURE,
} from 'constants/actionTypes/recentlyExtended';
import { convertArrToObj } from 'helpers/generic';

export default combineReducers({
    recentlyExtended: recentlyExtendedReducer,
    isFetching: isFetchingReducer,
    error: errorReducer,
});

function isFetchingReducer(state = false, action) {
    switch (action.type) {
        case ADMIN_FETCH_RECENTLY_EXTENDED_REQUEST:
            return true;
        case ADMIN_FETCH_RECENTLY_EXTENDED_SUCCESS:
        case ADMIN_FETCH_RECENTLY_EXTENDED_FAILURE:
            return false;
        default:
            return state;
    }
}

function errorReducer(state = null, action) {
    switch (action.type) {
        case ADMIN_FETCH_RECENTLY_EXTENDED_REQUEST:
            return null;
        case ADMIN_FETCH_RECENTLY_EXTENDED_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function recentlyExtendedReducer(state = {}, action) {
    switch (action.type) {
        case ADMIN_FETCH_RECENTLY_EXTENDED_SUCCESS:
            return convertArrToObj(action.payload);
        default:
            return state;
    }
}
