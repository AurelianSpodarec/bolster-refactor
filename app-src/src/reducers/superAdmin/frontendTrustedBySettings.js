import { combineReducers } from 'redux';

import {
    ADMIN_FETCH_TRUSTED_BY_REQUEST,
    ADMIN_FETCH_TRUSTED_BY_FAILURE,
    ADMIN_FETCH_TRUSTED_BY_SUCCESS,
    ADMIN_UPLOAD_TRUSTED_BY_REQUEST,
    ADMIN_UPLOAD_TRUSTED_BY_FAILURE,
    ADMIN_UPLOAD_TRUSTED_BY_SUCCESS,
} from 'constants/actionTypes/frontendTrustedBySettings';

export default combineReducers({
    postSuccess: postSuccessReducer,
    error: errorReducer,
    isFetching: isFetchingReducer,
    trustedBy: trustedByReducer,
});

function postSuccessReducer(state = false, action) {
    switch (action.type) {
        case ADMIN_UPLOAD_TRUSTED_BY_REQUEST:
            return false;
        case ADMIN_UPLOAD_TRUSTED_BY_SUCCESS:
            return true;
        default:
            return state;
    }
}

function errorReducer(state = null, action) {
    switch (action.type) {
        case ADMIN_FETCH_TRUSTED_BY_REQUEST:
        case ADMIN_UPLOAD_TRUSTED_BY_REQUEST:
            return null;
        case ADMIN_FETCH_TRUSTED_BY_FAILURE:
        case ADMIN_UPLOAD_TRUSTED_BY_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function isFetchingReducer(state = false, action) {
    switch (action.type) {
        case ADMIN_FETCH_TRUSTED_BY_REQUEST:
        case ADMIN_UPLOAD_TRUSTED_BY_REQUEST:
            return true;
        case ADMIN_FETCH_TRUSTED_BY_SUCCESS:
        case ADMIN_FETCH_TRUSTED_BY_FAILURE:
        case ADMIN_UPLOAD_TRUSTED_BY_SUCCESS:
        case ADMIN_UPLOAD_TRUSTED_BY_FAILURE:
            return false;
        default:
            return state;
    }
}

function trustedByReducer(state = null, action) {
    switch (action.type) {
        case ADMIN_FETCH_TRUSTED_BY_SUCCESS:
            return action.payload;
        default:
            return state;
    }
}
