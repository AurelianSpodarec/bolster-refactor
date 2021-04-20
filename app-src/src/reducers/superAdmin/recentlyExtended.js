import { combineReducers } from 'redux';

import {
    ADMIN_FETCH_RECENTLY_EXTENDED_REQUEST,
    ADMIN_FETCH_RECENTLY_EXTENDED_SUCCESS,
    ADMIN_FETCH_RECENTLY_EXTENDED_FAILURE,
    UPDATE_RECENTLY_EXTENDED_PAGE,
    FETCH_RECENTLY_EXTENDED_BY_PAGE_SUCCESS,
    FETCH_RECENTLY_EXTENDED_BY_PAGE_REQUEST,
    FETCH_RECENTLY_EXTENDED_BY_PAGE_FAILURE,
} from 'constants/actionTypes/recentlyExtended';

import { convertArrToObj, updateObj } from 'helpers/generic';

export default combineReducers({
    recentlyExtended: recentlyExtendedReducer,
    isFetching: isFetchingReducer,
    error: errorReducer,
    filters: filtersReducer,
    count: countReducer,
});

function isFetchingReducer(state = false, action) {
    switch (action.type) {
        case ADMIN_FETCH_RECENTLY_EXTENDED_REQUEST:
        case FETCH_RECENTLY_EXTENDED_BY_PAGE_REQUEST:
            return true;
        case ADMIN_FETCH_RECENTLY_EXTENDED_SUCCESS:
        case ADMIN_FETCH_RECENTLY_EXTENDED_FAILURE:
        case FETCH_RECENTLY_EXTENDED_BY_PAGE_FAILURE:
            return false;
        default:
            return state;
    }
}

function errorReducer(state = null, action) {
    switch (action.type) {
        case ADMIN_FETCH_RECENTLY_EXTENDED_REQUEST:
        case FETCH_RECENTLY_EXTENDED_BY_PAGE_REQUEST:
            return null;
        case ADMIN_FETCH_RECENTLY_EXTENDED_FAILURE:
        case FETCH_RECENTLY_EXTENDED_BY_PAGE_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function recentlyExtendedReducer(state = {}, action) {
    switch (action.type) {
        case ADMIN_FETCH_RECENTLY_EXTENDED_SUCCESS:
        case FETCH_RECENTLY_EXTENDED_BY_PAGE_SUCCESS:
            return convertArrToObj(action.payload.drawings);
        default:
            return state;
    }
}

function filtersReducer(state = { page: 1 }, action) {
    switch (action.type) {
        case UPDATE_RECENTLY_EXTENDED_PAGE:
            return updateObj(state, 'page', action.pageNumber);
        default:
            return state;
    }
}

function countReducer(state = 0, action) {
    switch (action.type) {
        case ADMIN_FETCH_RECENTLY_EXTENDED_SUCCESS:
            return action.payload.length;
        case FETCH_RECENTLY_EXTENDED_BY_PAGE_SUCCESS:
            return action.payload.totalCount;
        default:
            return state;
    }
}
