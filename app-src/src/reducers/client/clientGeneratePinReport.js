import { combineReducers } from 'redux';

import {
    CLIENT_SINGLE_PIN_GENERATE_REPORT_REQUEST,
    CLIENT_SINGLE_PIN_GENERATE_REPORT_SUCCESS,
    CLIENT_SINGLE_PIN_GENERATE_REPORT_FAILURE
} from 'constants/client/actionTypes/clientPins';

export default combineReducers({
    isFetching: isFetchingReducer,
    error: errorReducer,
    success: successReducer
});

function isFetchingReducer(state = false, action) {
    switch (action.type) {
        case CLIENT_SINGLE_PIN_GENERATE_REPORT_REQUEST:
            return true;
        case CLIENT_SINGLE_PIN_GENERATE_REPORT_SUCCESS:
        case CLIENT_SINGLE_PIN_GENERATE_REPORT_FAILURE:
            return false;
        default:
            return state;
    }
}

function errorReducer(state = null, action) {
    switch (action.type) {
        case CLIENT_SINGLE_PIN_GENERATE_REPORT_REQUEST:
            return null;
        case CLIENT_SINGLE_PIN_GENERATE_REPORT_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function successReducer(state = false, action) {
    switch (action.type) {
        case CLIENT_SINGLE_PIN_GENERATE_REPORT_REQUEST:
            return false;
        case CLIENT_SINGLE_PIN_GENERATE_REPORT_SUCCESS:
            return true;
        default:
            return state;
    }
}
