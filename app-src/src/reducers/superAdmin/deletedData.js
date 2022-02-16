import { combineReducers } from 'redux';

import {
    ADMIN_FETCH_RECENTLY_DELETED_REQUEST,
    ADMIN_FETCH_RECENTLY_DELETED_SUCCESS,
    ADMIN_FETCH_RECENTLY_DELETED_FAILURE,
} from 'constants/actionTypes/deletedData';

export default combineReducers({
    deleted: deletedReducer,
    isFetchingData: isFetchingDataReducer,
    error: errorReducer,
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

function deletedReducer(state = {}, action) {
    switch (action.type) {
        case ADMIN_FETCH_RECENTLY_DELETED_REQUEST:
            return {};
        case ADMIN_FETCH_RECENTLY_DELETED_SUCCESS:
            return action.payload;
        default:
            return state;
    }
}
