import { combineReducers } from 'redux';

import {
    FETCH_TIMESHEET_WEEK_REQUEST,
    FETCH_TIMESHEET_WEEK_FAILURE,
    FETCH_TIMESHEET_WEEK_SUCCESS,
    FETCH_TIMESHEET_DAY_REQUEST,
    FETCH_TIMESHEET_DAY_FAILURE,
    FETCH_TIMESHEET_DAY_SUCCESS,
} from 'constants/actionTypes/timesheets';

export default combineReducers({
    isFetching: isFetchingReducer,
    error: errorReducer,

    timesheet: timesheetReducer,
});

function isFetchingReducer(state = false, action) {
    switch (action.type) {
        case FETCH_TIMESHEET_WEEK_REQUEST:
            return true;
        case FETCH_TIMESHEET_DAY_REQUEST:
            return true;
        case FETCH_TIMESHEET_WEEK_FAILURE:
            return false;

        case FETCH_TIMESHEET_DAY_FAILURE:
            return false;
        case FETCH_TIMESHEET_WEEK_SUCCESS:
            return false;
        case FETCH_TIMESHEET_DAY_SUCCESS:
            return false;

        default:
            return state;
    }
}

function errorReducer(state = null, action) {
    switch (action.type) {
        case FETCH_TIMESHEET_WEEK_REQUEST:
            return null;
        case FETCH_TIMESHEET_DAY_REQUEST:
            return null;
        case FETCH_TIMESHEET_WEEK_FAILURE:
            return action.payload;

        case FETCH_TIMESHEET_DAY_FAILURE:
            return action.payload;
        case FETCH_TIMESHEET_WEEK_SUCCESS:
            return null;
        case FETCH_TIMESHEET_DAY_SUCCESS:
            return null;

        default:
            return state;
    }
}

function timesheetReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_TIMESHEET_WEEK_REQUEST:
            return state;
        case FETCH_TIMESHEET_DAY_REQUEST:
        case FETCH_TIMESHEET_WEEK_FAILURE:
            return state;
        case FETCH_TIMESHEET_DAY_FAILURE:

        case FETCH_TIMESHEET_WEEK_SUCCESS:
            return action.payload;
        case FETCH_TIMESHEET_DAY_SUCCESS:

        default:
            return state;
    }
}
