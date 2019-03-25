import { combineReducers } from 'redux';
import {
    FETCH_ALL_USERS_REQUEST,
    FETCH_ALL_USERS_SUCCESS,
    FETCH_ALL_USERS_FAILURE,
    CREATE_USER_REQUEST,
    CREATE_USER_SUCCESS,
    CREATE_USER_FAILURE
} from 'constants/actionTypes/users';
import { convertArrToObj, updateObj } from 'helpers/generic';

export default combineReducers({
    error: errorReducer,
    isFetching: isFetchingReducer,
    users: usersReducer,
    postSuccess: postSuccessReducer,
    updatedUserID: updatedUserIDReducer
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

function postSuccessReducer(state = false, action) {
    switch (action.type) {
        case CREATE_USER_REQUEST:
            return false;
        case CREATE_USER_SUCCESS:
            return true;
        default:
            return state;
    }
}

function errorReducer(state = null, action) {
    switch (action.type) {
        case CREATE_USER_REQUEST:
        case FETCH_ALL_USERS_REQUEST:
            return null;
        case FETCH_ALL_USERS_FAILURE:
        case CREATE_USER_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function usersReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_ALL_USERS_SUCCESS:
            return convertArrToObj(action.payload);
        case CREATE_USER_SUCCESS:
            return updateObj(state, action.payload.id, action.payload);
        default:
            return state;
    }
}

function updatedUserIDReducer(state = 0, action) {
    switch (action.type) {
        case CREATE_USER_REQUEST:
            return 0;
        case CREATE_USER_SUCCESS:
            return action.payload.id;
        default:
            return state;
    }
}
