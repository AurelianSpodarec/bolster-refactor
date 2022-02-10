import { convertArrToObj } from 'helpers/generic';
import { combineReducers } from 'redux';

import {
    FETCH_SUPER_ADMIN_TIMESHEETS_REQUEST,
    FETCH_SUPER_ADMIN_TIMESHEETS_SUCCESS,
    FETCH_SUPER_ADMIN_TIMESHEETS_FAILURE,
} from 'constants/actionTypes/superAdminTimesheets';

export default combineReducers({
    isFetching: isFetchingReducer,
    timesheets: timesheetsReducer,
    error: errorReducer,
});

function isFetchingReducer(state = false, action) {
    switch (action.type) {
        case FETCH_SUPER_ADMIN_TIMESHEETS_REQUEST:
            return true;
        case FETCH_SUPER_ADMIN_TIMESHEETS_SUCCESS:
        case FETCH_SUPER_ADMIN_TIMESHEETS_FAILURE:
            return false;
        default:
            return state;
    }
}

function timesheetsReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_SUPER_ADMIN_TIMESHEETS_SUCCESS:
            return convertArrToObj(action.payload);
        default:
            return state;
    }
}

function errorReducer(state = null, action) {
    switch (action.type) {
        case FETCH_SUPER_ADMIN_TIMESHEETS_FAILURE:
            return action.error;
        case FETCH_SUPER_ADMIN_TIMESHEETS_REQUEST:
            return null;
        default:
            return state;
    }
}
