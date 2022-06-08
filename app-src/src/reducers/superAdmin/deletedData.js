import { combineReducers } from 'redux';

import {
    ADMIN_FETCH_RECENTLY_DELETED_REQUEST,
    ADMIN_FETCH_RECENTLY_DELETED_SUCCESS,
    ADMIN_FETCH_RECENTLY_DELETED_FAILURE,
    ADMIN_RESTORE_RECENTLY_DELETED_REQUEST,
    ADMIN_RESTORE_RECENTLY_DELETED_SUCCESS,
    ADMIN_RESTORE_RECENTLY_DELETED_FAILURE,
} from 'constants/actionTypes/deletedData';
import { removeObjItem } from 'helpers/generic';

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
        case ADMIN_FETCH_RECENTLY_DELETED_REQUEST:
            return true;
        case ADMIN_FETCH_RECENTLY_DELETED_SUCCESS:
        case ADMIN_FETCH_RECENTLY_DELETED_FAILURE:
            return false;
        default:
            return state;
    }
}

function errorReducer(state = null, action) {
    switch (action.type) {
        case ADMIN_FETCH_RECENTLY_DELETED_REQUEST:
            return null;
        case ADMIN_FETCH_RECENTLY_DELETED_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function postErrorReducer(state = null, action) {
    switch (action.type) {
        case ADMIN_RESTORE_RECENTLY_DELETED_REQUEST:
            return null;
        case ADMIN_RESTORE_RECENTLY_DELETED_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function isPostingReducer(state = false, action) {
    switch (action.type) {
        case ADMIN_RESTORE_RECENTLY_DELETED_REQUEST:
            return true;
        case ADMIN_RESTORE_RECENTLY_DELETED_SUCCESS:
        case ADMIN_RESTORE_RECENTLY_DELETED_FAILURE:
            return false;
        default:
            return state;
    }
}

function postSuccessReducer(state = false, action) {
    switch (action.type) {
        case ADMIN_RESTORE_RECENTLY_DELETED_REQUEST:
            return false;
        case ADMIN_RESTORE_RECENTLY_DELETED_SUCCESS:
            return true;
        default:
            return state;
    }
}

function postFailureReducer(state = false, action) {
    switch (action.type) {
        case ADMIN_RESTORE_RECENTLY_DELETED_REQUEST:
            return false;
        case ADMIN_RESTORE_RECENTLY_DELETED_FAILURE:
            return true;
        default:
            return state;
    }
}

function deletedReducer(state = {}, action) {
    switch (action.type) {
        case ADMIN_FETCH_RECENTLY_DELETED_REQUEST:
            return {};
        case ADMIN_FETCH_RECENTLY_DELETED_SUCCESS:
            return action.payload;
        case ADMIN_RESTORE_RECENTLY_DELETED_SUCCESS:
            return state.filter(item => item.restoreURI !== action.restoreURI);
        default:
            return state;
    }
}
