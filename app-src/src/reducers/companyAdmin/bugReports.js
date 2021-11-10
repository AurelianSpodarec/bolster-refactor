import { combineReducers } from 'redux';

import {
    CREATE_BUG_REPORT_REQUEST,
    CREATE_BUG_REPORT_SUCCESS,
    CREATE_BUG_REPORT_FAILURE,
} from 'constants/actionTypes/bugReports';

export default combineReducers({
    isPosting: isPostingReducer,
    postSuccess: postSuccessReducer,
    error: errorReducer,
    ticketReference: ticketReferenceReducer,
});

function isPostingReducer(state = false, action) {
    switch (action.type) {
        case CREATE_BUG_REPORT_REQUEST:
            return true;
        case CREATE_BUG_REPORT_SUCCESS:
        case CREATE_BUG_REPORT_FAILURE:
            return false;
        default:
            return state;
    }
}

function postSuccessReducer(state = false, action) {
    switch (action.type) {
        case CREATE_BUG_REPORT_SUCCESS:
            return true;
        case CREATE_BUG_REPORT_REQUEST:
        case CREATE_BUG_REPORT_FAILURE:
            return false;
        default:
            return state;
    }
}

function errorReducer(state = null, action) {
    switch (action.type) {
        case CREATE_BUG_REPORT_FAILURE:
            return action.payload;
        case CREATE_BUG_REPORT_REQUEST:
            return false;
        default:
            return state;
    }
}

function ticketReferenceReducer(state = '', action) {
    switch (action.type) {
        case CREATE_BUG_REPORT_SUCCESS:
            return action.payload.ticketReference;
        default:
            return state;
    }
}
