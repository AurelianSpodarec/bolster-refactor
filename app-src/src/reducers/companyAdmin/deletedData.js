import { combineReducers } from 'redux';

import { convertArrToObj } from 'helpers/generic';
import {
    FETCH_DELETED_DRAWINGS_REQUEST,
    FETCH_DELETED_DRAWINGS_SUCCESS,
    FETCH_DELETED_DRAWINGS_FAILURE,
    FETCH_DELETED_PIN_HISTORIES_REQUEST,
    FETCH_DELETED_PIN_HISTORIES_SUCCESS,
    FETCH_DELETED_PIN_HISTORIES_FAILURE
} from 'constants/actionTypes/deletedData';

export default combineReducers({
    drawings: drawingsReducer,
    pinHistories: pinHistoriesReducer,
    isFetchingDrawings: isFetchingDrawingsReducer,
    isFetchingPinHistories: isFetchingPinHistoriesReducer,
    error: errorReducer
    // postSuccess: postSuccessReducer,
    // postFailure: postFailureReducer,
});

function isFetchingDrawingsReducer(state = false, action) {
    switch (action.type) {
        case FETCH_DELETED_DRAWINGS_REQUEST:
            return true;
        case FETCH_DELETED_DRAWINGS_SUCCESS:
        case FETCH_DELETED_DRAWINGS_FAILURE:
            return false;
        default:
            return state;
    }
}

function isFetchingPinHistoriesReducer(state = false, action) {
    switch (action.type) {
        case FETCH_DELETED_PIN_HISTORIES_REQUEST:
            return true;
        case FETCH_DELETED_PIN_HISTORIES_SUCCESS:
        case FETCH_DELETED_PIN_HISTORIES_FAILURE:
            return false;
        default:
            return state;
    }
}

function errorReducer(state = null, action) {
    switch (action.type) {
        case FETCH_DELETED_DRAWINGS_REQUEST:
            return null;
        case FETCH_DELETED_DRAWINGS_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function drawingsReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_DELETED_DRAWINGS_REQUEST:
            return {};
        case FETCH_DELETED_DRAWINGS_SUCCESS:
            return convertArrToObj(action.payload);
        default:
            return state;
    }
}

function pinHistoriesReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_DELETED_PIN_HISTORIES_REQUEST:
            return {};
        case FETCH_DELETED_PIN_HISTORIES_SUCCESS:
            return convertArrToObj(action.payload);
        default:
            return state;
    }
}

// function postSuccessReducer(state = false, action) {
//     switch (action.type) {
//         case CREATE_DRAWING_REQUEST:
//         case CREATE_DRAWINGS_REQUEST:
//         case ARCHIVE_DRAWING_REQUEST:
//         case EDIT_DRAWING_REQUEST:
//         case ADD_CREDITS_TO_DRAWING_REQUEST:
//             return false;
//         case CREATE_DRAWING_SUCCESS:
//         case CREATE_DRAWINGS_SUCCESS:
//         case ARCHIVE_DRAWING_SUCCESS:
//         case EDIT_DRAWING_SUCCESS:
//         case ADD_CREDITS_TO_DRAWING_SUCCESS:
//             return true;
//         default:
//             return state;
//     }
// }

// function postFailureReducer(state = false, action) {
//     switch (action.type) {
//         case DELETE_DRAWING_REQUEST:
//         case ARCHIVE_DRAWING_REQUEST:
//             return false;
//         case DELETE_DRAWING_FAILURE:
//         case ARCHIVE_DRAWING_FAILURE:
//             return true;
//         default:
//             return state;
//     }
// }
