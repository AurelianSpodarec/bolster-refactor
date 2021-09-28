import { combineReducers } from 'redux';

import {
    ADMIN_FETCH_PINS_FOR_COMPANY_REQUEST,
    ADMIN_FETCH_PINS_FOR_COMPANY_SUCCESS,
    ADMIN_FETCH_PINS_FOR_COMPANY_FAILURE,
    ADMIN_MERGE_TOOL_CSV_REQUEST,
    ADMIN_MERGE_TOOL_CSV_SUCCESS,
    ADMIN_MERGE_TOOL_CSV_FAILURE,
} from 'constants/actionTypes/pins';

import { convertArrToObj } from 'helpers/generic';

export default combineReducers({
    csvPins: csvPinsReducer,
    pins: pinsReducer,
    isFetching: isFetchingReducer,
    error: errorReducer,
});

function isFetchingReducer(state = false, action) {
    switch (action.type) {
        case ADMIN_FETCH_PINS_FOR_COMPANY_REQUEST:
        case ADMIN_MERGE_TOOL_CSV_REQUEST:
            return true;
        case ADMIN_FETCH_PINS_FOR_COMPANY_SUCCESS:
        case ADMIN_FETCH_PINS_FOR_COMPANY_FAILURE:
        case ADMIN_MERGE_TOOL_CSV_SUCCESS:
        case ADMIN_MERGE_TOOL_CSV_FAILURE:
            return false;
        default:
            return state;
    }
}

function errorReducer(state = null, action) {
    switch (action.type) {
        case ADMIN_FETCH_PINS_FOR_COMPANY_REQUEST:
        case ADMIN_MERGE_TOOL_CSV_REQUEST:
            return null;
        case ADMIN_FETCH_PINS_FOR_COMPANY_FAILURE:
        case ADMIN_MERGE_TOOL_CSV_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function pinsReducer(state = {}, action) {
    switch (action.type) {
        case ADMIN_FETCH_PINS_FOR_COMPANY_REQUEST:
            return {};
        case ADMIN_FETCH_PINS_FOR_COMPANY_SUCCESS:
            return convertArrToObj(action.payload);
        default:
            return state;
    }
}

function csvPinsReducer(state = [], action) {
    switch (action.type) {
        case ADMIN_MERGE_TOOL_CSV_REQUEST:
            return [];
        case ADMIN_MERGE_TOOL_CSV_SUCCESS:
            return action.payload;
        default:
            return state;
    }
}
