import { combineReducers } from 'redux';

import {
    FETCH_TIMESHEET_PIN_STATS_REQUEST,
    FETCH_TIMESHEET_PIN_STATS_SUCCESS,
    FETCH_TIMESHEET_PIN_STATS_FAILURE,
} from 'constants/actionTypes/timesheetPinStats';

export default combineReducers({
    isFetching: isFetchingReducer,
    error: errorReducer,

    stats: pinStatsReducer,
});

function isFetchingReducer(state = false, action) {
    switch (action.type) {
        case FETCH_TIMESHEET_PIN_STATS_REQUEST:
            return true;
        case FETCH_TIMESHEET_PIN_STATS_SUCCESS:
            return false;
        case FETCH_TIMESHEET_PIN_STATS_FAILURE:
            return false;

        default:
            return state;
    }
}

function errorReducer(state = null, action) {
    switch (action.type) {
        case FETCH_TIMESHEET_PIN_STATS_REQUEST:
            return null;
        case FETCH_TIMESHEET_PIN_STATS_FAILURE:
            return action.error;

        default:
            return state;
    }
}

function pinStatsReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_TIMESHEET_PIN_STATS_REQUEST:
            return {};
        case FETCH_TIMESHEET_PIN_STATS_SUCCESS:
            return action.payload;
        default:
            return state;
    }
}
