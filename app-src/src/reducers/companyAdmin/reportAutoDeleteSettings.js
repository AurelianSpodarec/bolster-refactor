import { combineReducers } from 'redux';

import {
    EDIT_REPORT_AUTO_DELETE_SETTINGS_REQUEST,
    EDIT_REPORT_AUTO_DELETE_SETTINGS_SUCCESS,
    EDIT_REPORT_AUTO_DELETE_SETTINGS_FAILURE,
} from 'constants/actionTypes/reportAutoDeleteSettings';

export default combineReducers({
    error: errorReducer,
    postSuccess: postSuccessReducer,
    isPosting: isPostingReducer,
});

function isPostingReducer(state = false, action) {
    switch (action.type) {
        case EDIT_REPORT_AUTO_DELETE_SETTINGS_REQUEST:
            return true;
        case EDIT_REPORT_AUTO_DELETE_SETTINGS_SUCCESS:
        case EDIT_REPORT_AUTO_DELETE_SETTINGS_FAILURE:
            return false;
        default:
            return state;
    }
}

function errorReducer(state = null, action) {
    switch (action.type) {
        case EDIT_REPORT_AUTO_DELETE_SETTINGS_REQUEST:
            return null;
        case EDIT_REPORT_AUTO_DELETE_SETTINGS_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function postSuccessReducer(state = false, action) {
    switch (action.type) {
        case EDIT_REPORT_AUTO_DELETE_SETTINGS_REQUEST:
            return false;
        case EDIT_REPORT_AUTO_DELETE_SETTINGS_SUCCESS:
            return true;
        default:
            return state;
    }
}
