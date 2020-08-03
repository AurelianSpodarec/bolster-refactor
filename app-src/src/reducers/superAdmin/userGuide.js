import { combineReducers } from 'redux';

import {
    ADMIN_UPLOAD_USER_GUIDE_REQUEST,
    ADMIN_UPLOAD_USER_GUIDE_SUCCESS,
    ADMIN_UPLOAD_USER_GUIDE_FAILURE,
    ADMIN_FETCH_USER_GUIDE_FAILURE,
    ADMIN_FETCH_USER_GUIDE_REQUEST,
    ADMIN_FETCH_USER_GUIDE_SUCCESS,
} from 'constants/actionTypes/userGuide';

export default combineReducers({
    postSuccess: postSuccessReducer,
    error: errorReducer,
    isFetching: isFetchingReducer,
    userGuide: userGuideReducer,
});

function postSuccessReducer(state = false, action) {
    switch (action.type) {
        case ADMIN_UPLOAD_USER_GUIDE_REQUEST:
            return false;
        case ADMIN_UPLOAD_USER_GUIDE_SUCCESS:
            return true;
        default:
            return state;
    }
}

function errorReducer(state = null, action) {
    switch (action.type) {
        case ADMIN_UPLOAD_USER_GUIDE_REQUEST:
        case ADMIN_FETCH_USER_GUIDE_REQUEST:
            return null;
        case ADMIN_UPLOAD_USER_GUIDE_FAILURE:
        case ADMIN_FETCH_USER_GUIDE_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function isFetchingReducer(state = false, action) {
    switch (action.type) {
        case ADMIN_FETCH_USER_GUIDE_REQUEST:
            return true;
        case ADMIN_FETCH_USER_GUIDE_SUCCESS:
        case ADMIN_FETCH_USER_GUIDE_FAILURE:
            return false;
        default:
            return state;
    }
}

function userGuideReducer(state = {}, action) {
    switch (action.type) {
        case ADMIN_FETCH_USER_GUIDE_SUCCESS:
            return action.payload;
        default:
            return state;
    }
}
