import { combineReducers } from 'redux';

import {
    FETCH_PROFILE_REQUEST,
    FETCH_PROFILE_SUCCESS,
    FETCH_PROFILE_FAILURE
} from 'constants/actionTypes/profile';

export default combineReducers({
    profile: profileReducer,
    isFetching: isFetchingReducer,
    error: errorReducer
});

function isFetchingReducer(state = false, action) {
    switch (action.type) {
        case FETCH_PROFILE_REQUEST:
            return true;
        case FETCH_PROFILE_SUCCESS:
        case FETCH_PROFILE_FAILURE:
            return false;
        default:
            return state;
    }
}

function errorReducer(state = null, action) {
    switch (action.type) {
        case FETCH_PROFILE_REQUEST:
            return null;
        case FETCH_PROFILE_FAILURE:
            return action.error.message;
        default:
            return state;
    }
}

function profileReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_PROFILE_SUCCESS:
            return action.payload;
        default:
            return state;
    }
}
