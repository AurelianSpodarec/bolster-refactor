import { combineReducers } from 'redux';
import { convertArrToObj, removeObjItem, updateObj } from 'helpers/generic';

import {
    DELETE_BUG_REPORT_FAILURE,
    DELETE_BUG_REPORT_REQUEST,
    DELETE_BUG_REPORT_SUCCESS,
    FETCH_BUG_REPORTS_FAILURE,
    FETCH_BUG_REPORTS_REQUEST,
    FETCH_BUG_REPORTS_SUCCESS,
    FETCH_BUG_REPORT_FAILURE,
    FETCH_BUG_REPORT_REQUEST,
    FETCH_BUG_REPORT_SUCCESS,
} from 'constants/actionTypes/bugReports';

export default combineReducers({
    isFetching: isFetchingReducer,
    bugReports: bugReportsReducer,
    error: errorReducer,
    isPosting: isPostingReducer,
    postSuccess: postSuccessReducer,
});

function isFetchingReducer(state = false, action) {
    switch (action.type) {
        case FETCH_BUG_REPORTS_REQUEST:
        case FETCH_BUG_REPORT_REQUEST:
            return true;
        case FETCH_BUG_REPORTS_SUCCESS:
        case FETCH_BUG_REPORT_SUCCESS:
            return false;
        case FETCH_BUG_REPORTS_FAILURE:
        case FETCH_BUG_REPORT_FAILURE:
            return false;
        default:
            return state;
    }
}

function isPostingReducer(state = false, action) {
    switch (action.type) {
        case DELETE_BUG_REPORT_REQUEST:
            return true;
        case DELETE_BUG_REPORT_SUCCESS:
        case DELETE_BUG_REPORT_FAILURE:
            return false;
        default:
            return state;
    }
}

function bugReportsReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_BUG_REPORTS_SUCCESS:
            return convertArrToObj(action.payload);
        case FETCH_BUG_REPORT_SUCCESS:
            return updateObj(state, action.payload.id, action.payload);
        case DELETE_BUG_REPORT_SUCCESS:
            return removeObjItem(state, action.payload.id);
        default:
            return state;
    }
}

function postSuccessReducer(state = false, action) {
    switch (action.type) {
        case DELETE_BUG_REPORT_SUCCESS:
            return true;
        case DELETE_BUG_REPORT_FAILURE:
        case DELETE_BUG_REPORT_REQUEST:
            return false;
        default:
            return state;
    }
}

function errorReducer(state = null, action) {
    switch (action.type) {
        case FETCH_BUG_REPORTS_FAILURE:
        case FETCH_BUG_REPORT_FAILURE:
        case DELETE_BUG_REPORT_FAILURE:
            return action.payload;
        default:
            return state;
    }
}
