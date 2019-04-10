import { combineReducers } from 'redux';

import {
    FETCH_PROFILE_REQUEST,
    FETCH_PROFILE_SUCCESS,
    FETCH_PROFILE_FAILURE,
    EDIT_PROFILE_REQUEST,
    EDIT_PROFILE_SUCCESS,
    EDIT_PROFILE_FAILURE
} from 'constants/actionTypes/profile';
import { updateObj } from 'helpers/generic';

export default combineReducers({
    profile: profileReducer,
    isFetching: isFetchingReducer,
    error: errorReducer,
    isPosting: isPostingReducer,
    postSuccess: postSuccessReducer
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
        case EDIT_PROFILE_REQUEST:
            return null;
        case FETCH_PROFILE_FAILURE:
        case EDIT_PROFILE_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function isPostingReducer(state = false, action) {
    switch (action.type) {
        case EDIT_PROFILE_REQUEST:
            return true;
        case EDIT_PROFILE_SUCCESS:
        case EDIT_PROFILE_FAILURE:
            return false;
        default:
            return state;
    }
}

function postSuccessReducer(state = false, action) {
    switch (action.type) {
        case EDIT_PROFILE_SUCCESS:
            return true;
        case EDIT_PROFILE_REQUEST:
        case EDIT_PROFILE_FAILURE:
            return false;
        default:
            return state;
    }
}

function profileReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_PROFILE_SUCCESS:
            return action.payload;
        case EDIT_PROFILE_SUCCESS:
            return updateObj(state, 'profile', action.payload);
        default:
            return state;
    }
}
