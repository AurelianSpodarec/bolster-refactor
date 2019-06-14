import { combineReducers } from 'redux';

import {
    SINGLE_PIN_GENERATE_REPORT_REQUEST,
    SINGLE_PIN_GENERATE_REPORT_SUCCESS,
    SINGLE_PIN_GENERATE_REPORT_FAILURE
} from 'constants/actionTypes/pins';

export default combineReducers({
    isFetching: isFetchingReducer,
    error: errorReducer,
    success: successReducer
});

function isFetchingReducer(state = false, action) {
    switch (action.type) {
        case SINGLE_PIN_GENERATE_REPORT_REQUEST:
            return true;
        case SINGLE_PIN_GENERATE_REPORT_SUCCESS:
        case SINGLE_PIN_GENERATE_REPORT_FAILURE:
            return false;
        default:
            return state;
    }
}

function errorReducer(state = null, action) {
    switch (action.type) {
        case SINGLE_PIN_GENERATE_REPORT_REQUEST:
            return null;
        case SINGLE_PIN_GENERATE_REPORT_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function successReducer(state = false, action) {
    switch (action.type) {
        case SINGLE_PIN_GENERATE_REPORT_REQUEST:
            return false;
        case SINGLE_PIN_GENERATE_REPORT_SUCCESS:
            return true;
        default:
            return state;
    }
}
