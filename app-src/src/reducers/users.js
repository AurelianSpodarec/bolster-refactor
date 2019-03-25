import { combineReducers } from 'redux';
import {
    FETCH_ALL_USERS_REQUEST,
    FETCH_ALL_USERS_SUCCESS,
    FETCH_ALL_USERS_FAILURE
} from 'constants/actionTypes/users';
import { convertArrToObj } from 'helpers/generic';

export default combineReducers({
    error: errorReducer,
    isFetching: isFetchingReducer,
    users: usersReducer
});

function isFetchingReducer(state = false, action) {
    switch (action.type) {
        case FETCH_ALL_USERS_REQUEST:
            return true;
        case FETCH_ALL_USERS_SUCCESS:
        case FETCH_ALL_USERS_FAILURE:
            return false;
        default:
            return state;
    }
}

function errorReducer(state = null, action) {
    switch (action.type) {
        case FETCH_ALL_USERS_REQUEST:
            return null;
        case FETCH_ALL_USERS_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function usersReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_ALL_USERS_SUCCESS:
            return convertArrToObj(action.payload);
        default:
            return state;
    }
}
