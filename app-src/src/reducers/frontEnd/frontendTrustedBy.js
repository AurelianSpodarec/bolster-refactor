import { combineReducers } from 'redux';

import {
    FETCH_TRUSTED_BY_REQUEST,
    FETCH_TRUSTED_BY_FAILURE,
    FETCH_TRUSTED_BY_SUCCESS,
} from 'constants/actionTypes/frontendTrustedBySettings';

export default combineReducers({
    error: errorReducer,
    isFetching: isFetchingReducer,
    trustedBy: trustedByReducer,
});

function errorReducer(state = null, action) {
    switch (action.type) {
        case FETCH_TRUSTED_BY_REQUEST:
            return null;
        case FETCH_TRUSTED_BY_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function isFetchingReducer(state = false, action) {
    switch (action.type) {
        case FETCH_TRUSTED_BY_REQUEST:
            return true;
        case FETCH_TRUSTED_BY_SUCCESS:
        case FETCH_TRUSTED_BY_FAILURE:
            return false;
        default:
            return state;
    }
}

function trustedByReducer(state = null, action) {
    switch (action.type) {
        case FETCH_TRUSTED_BY_SUCCESS:
            return action.payload;
        default:
            return state;
    }
}
