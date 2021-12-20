import { combineReducers } from 'redux';

import {
    FETCH_TIMESHEET_WEEK_DROPDOWN_OPTIONS_REQUEST,
    FETCH_TIMESHEET_WEEK_DROPDOWN_OPTIONS_SUCCESS,
    FETCH_TIMESHEET_WEEK_DROPDOWN_OPTIONS_FAILURE,
    FETCH_TIMESHEET_WEEK_REQUEST,
    FETCH_TIMESHEET_WEEK_FAILURE,
    FETCH_TIMESHEET_WEEK_SUCCESS,
    FETCH_TIMESHEET_DAY_REQUEST,
    FETCH_TIMESHEET_DAY_FAILURE,
    FETCH_TIMESHEET_DAY_SUCCESS,
    TOGGLE_FILTER_BY_HAS_CLOCKED_IN,
    SET_SELECTED_COMPANY_ID,
} from 'constants/actionTypes/timesheets';

export default combineReducers({
    isFetching: isFetchingReducer,
    error: errorReducer,
    timesheets: timesheetReducer,
    timesheetOptions: timesheetOptionsReducer,
    filterByHasClockedIn: filterByHasClockedInReducer,
    selectedCompanyUserIDs: selectedCompanyUserIDsReducer,
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
            return action.error;
        case FETCH_TIMESHEET_DAY_FAILURE:
            return action.error;
        case FETCH_TIMESHEET_WEEK_SUCCESS:
            return null;
        case FETCH_TIMESHEET_DAY_SUCCESS:
            return null;
        default:
            return state;
    }
}

function timesheetOptionsReducer(state = [], action) {
    switch (action.type) {
        case FETCH_TIMESHEET_WEEK_DROPDOWN_OPTIONS_REQUEST:
            return state;
        case FETCH_TIMESHEET_WEEK_DROPDOWN_OPTIONS_FAILURE:
            return state;
        case FETCH_TIMESHEET_WEEK_DROPDOWN_OPTIONS_SUCCESS:
            return action.payload;
        default:
            return state;
    }
}

function timesheetReducer(state = [], action) {
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

function filterByHasClockedInReducer(state = true, action) {
    switch (action.type) {
        case TOGGLE_FILTER_BY_HAS_CLOCKED_IN:
            return (state = action.payload);
        default:
            return state;
    }
}

function selectedCompanyUserIDsReducer(state = [], action) {
    switch (action.type) {
        case SET_SELECTED_COMPANY_ID:
            return action.payload;
        default:
            return state;
    }
}
