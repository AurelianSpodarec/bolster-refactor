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
    SET_SELECTED_JOB_REFERENCE_ID,
    POST_OVERRIDE_SHIFT_REQUEST,
    POST_OVERRIDE_SHIFT_FAILURE,
    POST_OVERRIDE_SHIFT_SUCCESS,
    POST_REJECT_SHIFT_REQUEST,
    POST_REJECT_SHIFT_FAILURE,
    POST_REJECT_SHIFT_SUCCESS,
    POST_APPROVE_SHIFT_REQUEST,
    POST_APPROVE_SHIFT_FAILURE,
    POST_APPROVE_SHIFT_SUCCESS,
    DELETE_SHIFT_REQUEST,
    DELETE_SHIFT_FAILURE,
    DELETE_SHIFT_SUCCESS,
    PATCH_CLOCKER_ENTRY_REQUEST,
    PATCH_CLOCKER_ENTRY_SUCCESS,
    PATCH_CLOCKER_ENTRY_FAILURE,
    POST_GENERATE_TIMESHEETS_CSV_REQUEST,
    POST_GENERATE_TIMESHEETS_CSV_FAILURE,
    POST_GENERATE_TIMESHEETS_CSV_SUCCESS,
} from 'constants/actionTypes/timesheets';

export default combineReducers({
    isFetching: isFetchingReducer,
    error: errorReducer,
    isPosting: isPostingReducer,
    postError: postErrorReducer,
    postSuccess: postSuccessReducer,
    timesheets: timesheetReducer,
    timesheetOptions: timesheetOptionsReducer,
    filterByHasClockedIn: filterByHasClockedInReducer,
    selectedCompanyUserIDs: selectedCompanyUserIDsReducer,
    selectedJobReferenceIDs: selectedJobReferenceIDsReducer,
    isDeleting: isDeletingReducer,
    deleteError: deleteErrorReducer,
    deleteSuccess: deleteSuccessReducer,
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
        case POST_REJECT_SHIFT_REQUEST:
        case POST_APPROVE_SHIFT_REQUEST:
        case PATCH_CLOCKER_ENTRY_REQUEST:
        case POST_GENERATE_TIMESHEETS_CSV_REQUEST:
            return true;
        case POST_OVERRIDE_SHIFT_SUCCESS:
        case POST_OVERRIDE_SHIFT_FAILURE:
        case POST_REJECT_SHIFT_SUCCESS:
        case POST_REJECT_SHIFT_FAILURE:
        case POST_APPROVE_SHIFT_SUCCESS:
        case POST_APPROVE_SHIFT_FAILURE:
        case PATCH_CLOCKER_ENTRY_SUCCESS:
        case PATCH_CLOCKER_ENTRY_FAILURE:
        case POST_GENERATE_TIMESHEETS_CSV_SUCCESS:
        case POST_GENERATE_TIMESHEETS_CSV_FAILURE:
            return false;
        default:
            return state;
    }
}

function postErrorReducer(state = null, action) {
    switch (action.type) {
        case POST_OVERRIDE_SHIFT_REQUEST:
        case POST_OVERRIDE_SHIFT_SUCCESS:
        case POST_REJECT_SHIFT_REQUEST:
        case POST_REJECT_SHIFT_SUCCESS:
        case POST_APPROVE_SHIFT_REQUEST:
        case POST_APPROVE_SHIFT_SUCCESS:
        case PATCH_CLOCKER_ENTRY_REQUEST:
        case POST_GENERATE_TIMESHEETS_CSV_REQUEST:
        case POST_GENERATE_TIMESHEETS_CSV_SUCCESS:
            return null;
        case POST_OVERRIDE_SHIFT_FAILURE:
        case POST_REJECT_SHIFT_FAILURE:
        case POST_APPROVE_SHIFT_FAILURE:
        case PATCH_CLOCKER_ENTRY_FAILURE:
        case POST_GENERATE_TIMESHEETS_CSV_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function postSuccessReducer(state = false, action) {
    switch (action.type) {
        case POST_OVERRIDE_SHIFT_REQUEST:
        case POST_OVERRIDE_SHIFT_FAILURE:
        case POST_REJECT_SHIFT_REQUEST:
        case POST_REJECT_SHIFT_FAILURE:
        case POST_APPROVE_SHIFT_REQUEST:
        case POST_APPROVE_SHIFT_FAILURE:
        case PATCH_CLOCKER_ENTRY_REQUEST:
            return false;
        case POST_OVERRIDE_SHIFT_SUCCESS:
        case POST_REJECT_SHIFT_SUCCESS:
        case POST_APPROVE_SHIFT_SUCCESS:
        case PATCH_CLOCKER_ENTRY_SUCCESS:
            return true;
        default:
            return state;
    }
}

function isDeletingReducer(state = false, action) {
    switch (action.type) {
        case DELETE_SHIFT_REQUEST:
            return true;
        case DELETE_SHIFT_SUCCESS:
        case DELETE_SHIFT_FAILURE:
            return false;
        default:
            return state;
    }
}

function deleteErrorReducer(state = null, action) {
    switch (action.type) {
        case DELETE_SHIFT_REQUEST:
        case DELETE_SHIFT_SUCCESS:
            return null;
        case DELETE_SHIFT_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function deleteSuccessReducer(state = false, action) {
    switch (action.type) {
        case DELETE_SHIFT_REQUEST:
        case DELETE_SHIFT_FAILURE:
            return false;
        case DELETE_SHIFT_SUCCESS:
            return true;
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

function timesheetReducer(
    state = { companyUserWeeks: [], dailyHoursBreakdown: [], weeklyHoursBreakdown: {} },
    action,
) {
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

function selectedJobReferenceIDsReducer(state = [], action) {
    switch (action.type) {
        case SET_SELECTED_JOB_REFERENCE_ID:
            return action.payload;
        default:
            return state;
    }
}
