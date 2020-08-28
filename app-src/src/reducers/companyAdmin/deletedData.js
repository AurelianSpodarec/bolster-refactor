import { combineReducers } from 'redux';

import {
    FETCH_RECENTLY_DELETED_REQUEST,
    FETCH_RECENTLY_DELETED_SUCCESS,
    FETCH_RECENTLY_DELETED_FAILURE,
    RESTORE_RECENTLY_DELETED_REQUEST,
    RESTORE_RECENTLY_DELETED_SUCCESS,
    RESTORE_RECENTLY_DELETED_FAILURE,
} from 'constants/actionTypes/deletedData';

export default combineReducers({
    deleted: deletedReducer,
    isFetchingData: isFetchingDataReducer,
    error: errorReducer,
    isPosting: isPostingReducer,
    postSuccess: postSuccessReducer,
    postFailure: postFailureReducer,
    postError: postErrorReducer,
});

function isFetchingDataReducer(state = false, action) {
    switch (action.type) {
        case FETCH_RECENTLY_DELETED_REQUEST:
            return true;
        case FETCH_RECENTLY_DELETED_SUCCESS:
        case FETCH_RECENTLY_DELETED_FAILURE:
            return false;
        default:
            return state;
    }
}

function isPostingReducer(state = false, action) {
    switch (action.type) {
        case RESTORE_RECENTLY_DELETED_REQUEST:
            return true;
        case RESTORE_RECENTLY_DELETED_SUCCESS:
        case RESTORE_RECENTLY_DELETED_FAILURE:
            return false;
        default:
            return state;
    }
}

function postSuccessReducer(state = false, action) {
    switch (action.type) {
        case RESTORE_RECENTLY_DELETED_REQUEST:
            return false;
        case RESTORE_RECENTLY_DELETED_SUCCESS:
            return true;
        default:
            return state;
    }
}

function postFailureReducer(state = false, action) {
    switch (action.type) {
        case RESTORE_RECENTLY_DELETED_REQUEST:
            return false;
        case RESTORE_RECENTLY_DELETED_FAILURE:
            return true;
        default:
            return state;
    }
}

function errorReducer(state = null, action) {
    switch (action.type) {
        case FETCH_RECENTLY_DELETED_REQUEST:
            return null;
        case FETCH_RECENTLY_DELETED_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function postErrorReducer(state = null, action) {
    switch (action.type) {
        case RESTORE_RECENTLY_DELETED_REQUEST:
            return null;
        case RESTORE_RECENTLY_DELETED_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function deletedReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_RECENTLY_DELETED_REQUEST:
            return {};
        case FETCH_RECENTLY_DELETED_SUCCESS:
            return action.payload;
        case RESTORE_RECENTLY_DELETED_SUCCESS:
            return state.filter(item => item.restoreURI !== action.restoreURI);
        default:
            return state;
    }
}
