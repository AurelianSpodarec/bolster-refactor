import { combineReducers } from 'redux';
import { convertArrToObj } from 'helpers/generic';

import {
    FETCH_BUG_REPORTS_FAILURE,
    FETCH_BUG_REPORTS_REQUEST,
    FETCH_BUG_REPORTS_SUCCESS,
} from 'constants/actionTypes/bugReports';

export default combineReducers({
    isFetching: isFetchingReducer,
    bugReports: bugReportsReducer,
    error: errorReducer,
});

function isFetchingReducer(state = false, action) {
    switch (action.type) {
        case FETCH_BUG_REPORTS_REQUEST:
            return true;
        case FETCH_BUG_REPORTS_SUCCESS:
            return false;
        case FETCH_BUG_REPORTS_FAILURE:
            return false;
        default:
            return state;
    }
}

function bugReportsReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_BUG_REPORTS_SUCCESS:
            return convertArrToObj(action.payload);
        default:
            return state;
    }
}

function errorReducer(state = null, action) {
    switch (action.type) {
        case FETCH_BUG_REPORTS_FAILURE:
            return action.payload;
        default:
            return state;
    }
}
