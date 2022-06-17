import { combineReducers } from 'redux';

import {
    FETCH_TIMESHEET_WEEK_PIN_OPTION_TYPES_REQUEST,
    FETCH_TIMESHEET_WEEK_PIN_OPTION_TYPES_SUCCESS,
    FETCH_TIMESHEET_WEEK_PIN_OPTION_TYPES_FAILURE,
    FETCH_TIMESHEET_WEEK_REQUEST,
    FETCH_TIMESHEET_WEEK_FAILURE,
    FETCH_TIMESHEET_WEEK_SUCCESS,
    TOGGLE_FILTER_BY_HAS_CLOCKED_IN,
    SET_SELECTED_COMPANY_ID,
    POST_OVERRIDE_SHIFT_REQUEST,
    POST_OVERRIDE_SHIFT_FAILURE,
    POST_OVERRIDE_SHIFT_SUCCESS,
} from 'constants/actionTypes/timesheets';

export default combineReducers({
    isFetching: isFetchingReducer,
    error: errorReducer,
    isPosting: isPostingReducer,
    postError: postErrorReducer,
    timesheets: timesheetReducer,
    timesheetOptions: timesheetOptionsReducer,
    filterByHasClockedIn: filterByHasClockedInReducer,
    selectedCompanyUserIDs: selectedCompanyUserIDsReducer,
});

function isFetchingReducer(state = false, action) {
    switch (action.type) {
        case FETCH_TIMESHEET_WEEK_REQUEST:
            return true;
        case FETCH_TIMESHEET_WEEK_FAILURE:
            return false;
        case FETCH_TIMESHEET_WEEK_SUCCESS:
            return false;
        default:
            return state;
    }
}

function errorReducer(state = null, action) {
    switch (action.type) {
        case FETCH_TIMESHEET_WEEK_REQUEST:
            return null;
        case FETCH_TIMESHEET_WEEK_FAILURE:
            return action.error;
        case FETCH_TIMESHEET_WEEK_SUCCESS:
            return null;
        default:
            return state;
    }
}

function isPostingReducer(state = false, action) {
    switch (action.type) {
        case POST_OVERRIDE_SHIFT_REQUEST:
            return true;
        case POST_OVERRIDE_SHIFT_SUCCESS:
        case POST_OVERRIDE_SHIFT_FAILURE:
            return false;
        default:
            return state;
    }
}

function postErrorReducer(state = null, action) {
    switch (action.type) {
        case POST_OVERRIDE_SHIFT_REQUEST:
        case POST_OVERRIDE_SHIFT_SUCCESS:
            return null;
        case POST_OVERRIDE_SHIFT_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function timesheetOptionsReducer(state = [], action) {
    switch (action.type) {
        case FETCH_TIMESHEET_WEEK_PIN_OPTION_TYPES_REQUEST:
            return state;
        case FETCH_TIMESHEET_WEEK_PIN_OPTION_TYPES_FAILURE:
            return state;
        case FETCH_TIMESHEET_WEEK_PIN_OPTION_TYPES_SUCCESS:
            return action.payload;
        default:
            return state;
    }
}

function timesheetReducer(state = [], action) {
    switch (action.type) {
        case FETCH_TIMESHEET_WEEK_REQUEST:
            return state;
        case FETCH_TIMESHEET_WEEK_FAILURE:
            return state;
        case FETCH_TIMESHEET_WEEK_SUCCESS:
            return action.payload;
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
