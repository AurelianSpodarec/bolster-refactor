import { combineReducers } from 'redux';

import {
    FETCH_USER_CREATIONS_REQUEST,
    FETCH_USER_CREATIONS_SUCCESS,
    FETCH_USER_CREATIONS_FAILURE,
} from 'constants/actionTypes/users';

import { convertArrToObj } from 'helpers/generic';

export default combineReducers({
    users: usersReducer,
    isFetching: isFetchingReducer,
    error: errorReducer,
});

function isFetchingReducer(state = false, action) {
    switch (action.type) {
        case FETCH_USER_CREATIONS_REQUEST:
            return true;
        case FETCH_USER_CREATIONS_SUCCESS:
        case FETCH_USER_CREATIONS_FAILURE:
            return false;
        default:
            return state;
    }
}

function errorReducer(state = null, action) {
    switch (action.type) {
        case FETCH_USER_CREATIONS_REQUEST:
            return null;
        case FETCH_USER_CREATIONS_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function usersReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_USER_CREATIONS_REQUEST:
            return {};
        case FETCH_USER_CREATIONS_SUCCESS:
            return convertArrToObj(action.payload);
        default:
            return state;
    }
}
