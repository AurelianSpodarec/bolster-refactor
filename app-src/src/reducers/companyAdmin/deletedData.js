import { combineReducers } from 'redux';

import { convertArrToObj, removeObjItem } from 'helpers/generic';
import {
    FETCH_DELETED_DRAWINGS_REQUEST,
    FETCH_DELETED_DRAWINGS_SUCCESS,
    FETCH_DELETED_DRAWINGS_FAILURE,
    FETCH_DELETED_PIN_HISTORIES_REQUEST,
    FETCH_DELETED_PIN_HISTORIES_SUCCESS,
    FETCH_DELETED_PIN_HISTORIES_FAILURE,
    RESTORE_DRAWING_REQUEST,
    RESTORE_DRAWING_SUCCESS,
    RESTORE_DRAWING_FAILURE,
    RESTORE_PIN_HISTORY_REQUEST,
    RESTORE_PIN_HISTORY_SUCCESS,
    RESTORE_PIN_HISTORY_FAILURE
} from 'constants/actionTypes/deletedData';

export default combineReducers({
    drawings: drawingsReducer,
    pinHistories: pinHistoriesReducer,
    isFetchingDrawings: isFetchingDrawingsReducer,
    isFetchingPinHistories: isFetchingPinHistoriesReducer,
    error: errorReducer,
    isPosting: isPostingReducer,
    postSuccess: postSuccessReducer,
    postFailure: postFailureReducer,
    postError: postErrorReducer
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

function isPostingReducer(state = false, action) {
    switch (action.type) {
        case RESTORE_DRAWING_REQUEST:
        case RESTORE_PIN_HISTORY_REQUEST:
            return true;
        case RESTORE_DRAWING_SUCCESS:
        case RESTORE_DRAWING_FAILURE:
        case RESTORE_PIN_HISTORY_SUCCESS:
        case RESTORE_PIN_HISTORY_FAILURE:
            return false;
        default:
            return state;
    }
}

function postSuccessReducer(state = false, action) {
    switch (action.type) {
        case RESTORE_DRAWING_REQUEST:
        case RESTORE_PIN_HISTORY_REQUEST:
            return false;
        case RESTORE_DRAWING_SUCCESS:
        case RESTORE_PIN_HISTORY_SUCCESS:
            return true;
        default:
            return state;
    }
}

function postFailureReducer(state = false, action) {
    switch (action.type) {
        case RESTORE_DRAWING_REQUEST:
        case RESTORE_PIN_HISTORY_REQUEST:
            return false;
        case RESTORE_DRAWING_FAILURE:
        case RESTORE_PIN_HISTORY_FAILURE:
            return true;
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

function postErrorReducer(state = null, action) {
    switch (action.type) {
        case RESTORE_DRAWING_REQUEST:
        case RESTORE_PIN_HISTORY_REQUEST:
            return null;
        case RESTORE_DRAWING_FAILURE:
        case RESTORE_PIN_HISTORY_FAILURE:
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
        case RESTORE_DRAWING_SUCCESS:
        case RESTORE_PIN_HISTORY_SUCCESS:
            console.log('id', action.id);
            return removeObjItem(state, action.id);
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
