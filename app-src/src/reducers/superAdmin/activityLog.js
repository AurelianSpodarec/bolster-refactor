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
            return convertArrToObj(action.payload);
        default:
            return state;
    }
}
