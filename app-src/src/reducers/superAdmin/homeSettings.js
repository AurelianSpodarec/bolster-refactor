import { combineReducers } from 'redux';

import {
    ADMIN_FETCH_TRUSTED_BY_REQUEST,
    ADMIN_FETCH_TRUSTED_BY_FAILURE,
    ADMIN_FETCH_TRUSTED_BY_SUCCESS,
} from 'constants/actionTypes/userGuide';

export default combineReducers({
    error: errorReducer,
    isFetching: isFetchingReducer,
    trustedBy: trustedByReducer,
});

function errorReducer(state = null, action) {
    switch (action.type) {
        case ADMIN_FETCH_TRUSTED_BY_REQUEST:
            return null;
        case ADMIN_FETCH_TRUSTED_BY_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function isFetchingReducer(state = false, action) {
    switch (action.type) {
        case ADMIN_FETCH_TRUSTED_BY_REQUEST:
            return true;
        case ADMIN_FETCH_TRUSTED_BY_SUCCESS:
        case ADMIN_FETCH_TRUSTED_BY_FAILURE:
            return false;
        default:
            return state;
    }
}

function trustedByReducer(state = {}, action) {
    switch (action.type) {
        case ADMIN_FETCH_TRUSTED_BY_SUCCESS:
            return action.payload;
        default:
            return state;
    }
}
