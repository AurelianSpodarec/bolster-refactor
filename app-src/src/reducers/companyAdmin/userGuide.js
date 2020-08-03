import { combineReducers } from 'redux';

import {
    FETCH_USER_GUIDE_REQUEST,
    FETCH_USER_GUIDE_SUCCESS,
    FETCH_USER_GUIDE_FAILURE,
} from 'constants/actionTypes/userGuide';

export default combineReducers({
    userGuide: userGuideReducer,
    isFetching: isFetchingReducer,
    error: errorReducer,
});

function isFetchingReducer(state = false, action) {
    switch (action.type) {
        case FETCH_USER_GUIDE_REQUEST:
            return true;
        case FETCH_USER_GUIDE_SUCCESS:
        case FETCH_USER_GUIDE_FAILURE:
            return false;
        default:
            return state;
    }
}

function errorReducer(state = null, action) {
    switch (action.type) {
        case FETCH_USER_GUIDE_REQUEST:
            return null;
        case FETCH_USER_GUIDE_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function userGuideReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_USER_GUIDE_SUCCESS:
            return action.payload;
        default:
            return state;
    }
}
