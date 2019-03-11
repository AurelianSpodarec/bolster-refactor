import { combineReducers } from 'redux';

import { convertArrToObj } from 'helpers/generic';
import {
    FETCH_DRAWING_INSPECTION_LOGS_REQUEST,
    FETCH_DRAWING_INSPECTION_LOGS_SUCCESS,
    FETCH_DRAWING_INSPECTION_LOGS_FAILURE
} from 'constants/actionTypes/drawings';

export default combineReducers({
    inspectionLogs: inspectionLogsReducer,
    isFetching: isFetchingReducer,
    error: errorReducer
});

function isFetchingReducer(state = false, action) {
    switch (action.type) {
        case FETCH_DRAWING_INSPECTION_LOGS_REQUEST:
            return true;
        case FETCH_DRAWING_INSPECTION_LOGS_SUCCESS:
        case FETCH_DRAWING_INSPECTION_LOGS_FAILURE:
            return false;
        default:
            return state;
    }
}

function errorReducer(state = null, action) {
    switch (action.type) {
        case FETCH_DRAWING_INSPECTION_LOGS_REQUEST:
            return null;
        case FETCH_DRAWING_INSPECTION_LOGS_FAILURE:
            return action.error.message;
        default:
            return state;
    }
}

function inspectionLogsReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_DRAWING_INSPECTION_LOGS_SUCCESS:
            return convertArrToObj(action.payload);
        default:
            return state;
    }
}
