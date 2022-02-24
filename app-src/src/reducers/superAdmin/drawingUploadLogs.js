import { combineReducers } from 'redux';

import { convertArrToObj, updateMultipleKeys } from 'helpers/generic';
import {
    FETCH_ALL_DRAWINGS_UPLOAD_LOGS_FAILURE,
    FETCH_ALL_DRAWINGS_UPLOAD_LOGS_REQUEST,
    FETCH_ALL_DRAWINGS_UPLOAD_LOGS_SUCCESS,
} from 'constants/actionTypes/drawingUploadLogs';

export default combineReducers({
    pages: pagesReducer,
    drawingsLogs: drawingsLogsReducer,
    isFetching: isFetchingReducer,
    error: errorReducer,
});

function isFetchingReducer(state = false, action) {
    switch (action.type) {
        case FETCH_ALL_DRAWINGS_UPLOAD_LOGS_REQUEST:
            return true;
        case FETCH_ALL_DRAWINGS_UPLOAD_LOGS_SUCCESS:
        case FETCH_ALL_DRAWINGS_UPLOAD_LOGS_FAILURE:
            return false;
        default:
            return state;
    }
}

function errorReducer(state = null, action) {
    switch (action.type) {
        case FETCH_ALL_DRAWINGS_UPLOAD_LOGS_REQUEST:
            return null;
        case FETCH_ALL_DRAWINGS_UPLOAD_LOGS_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function pagesReducer(state = { page: 1, pageSize: 50, totalPages: null }, action) {
    switch (action.type) {
        case FETCH_ALL_DRAWINGS_UPLOAD_LOGS_SUCCESS:
            return updateMultipleKeys(
                state,

                ['page', 'pageSize', 'totalPages'],

                [action.payload.page, action.payload.pageSize, action.payload.totalPages],
            );

        default:
            return state;
    }
}

function drawingsLogsReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_ALL_DRAWINGS_UPLOAD_LOGS_REQUEST:
            return {};
        case FETCH_ALL_DRAWINGS_UPLOAD_LOGS_SUCCESS:
            return convertArrToObj(action.payload.drawingUploads);
        default:
            return state;
    }
}
