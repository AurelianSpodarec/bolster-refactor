import { combineReducers } from 'redux';

import {
    ADMIN_FETCH_ACTIVITY_LOG_REQUEST,
    ADMIN_FETCH_ACTIVITY_LOG_SUCCESS,
    ADMIN_FETCH_ACTIVITY_LOG_FAILURE,
} from 'constants/actionTypes/activityLog';

import { convertArrToObj } from 'helpers/generic';

export default combineReducers({
    activityLog: activityLogReducer,
    isFetching: isFetchingReducer,
    error: errorReducer,
    pageNumber: pageNumberReducer,
    pageSize: pageSizeReducer,
    totalCount: totalCountReducer,
    totalPages: totalPagesReducer,
});

function isFetchingReducer(state = false, action) {
    switch (action.type) {
        case ADMIN_FETCH_ACTIVITY_LOG_REQUEST:
            return true;
        case ADMIN_FETCH_ACTIVITY_LOG_SUCCESS:
        case ADMIN_FETCH_ACTIVITY_LOG_FAILURE:
            return false;
        default:
            return state;
    }
}

function errorReducer(state = null, action) {
    switch (action.type) {
        case ADMIN_FETCH_ACTIVITY_LOG_REQUEST:
            return null;
        case ADMIN_FETCH_ACTIVITY_LOG_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function activityLogReducer(state = {}, action) {
    switch (action.type) {
        case ADMIN_FETCH_ACTIVITY_LOG_SUCCESS:
            return convertArrToObj(action.payload.activityLogs);
        default:
            return state;
    }
}

function pageNumberReducer(state = 1, action) {
    switch (action.type) {
        case ADMIN_FETCH_ACTIVITY_LOG_SUCCESS:
            return action.payload.pageNumber;
        default:
            return state;
    }
}

function pageSizeReducer(state = 50, action) {
    switch (action.type) {
        case ADMIN_FETCH_ACTIVITY_LOG_SUCCESS:
            return action.payload.pageSize;
        default:
            return state;
    }
}

function totalCountReducer(state = 0, action) {
    switch (action.type) {
        case ADMIN_FETCH_ACTIVITY_LOG_SUCCESS:
            return action.payload.totalCount;
        default:
            return state;
    }
}

function totalPagesReducer(state = 1, action) {
    switch (action.type) {
        case ADMIN_FETCH_ACTIVITY_LOG_SUCCESS:
            return action.payload.totalPages;
        default:
            return state;
    }
}
