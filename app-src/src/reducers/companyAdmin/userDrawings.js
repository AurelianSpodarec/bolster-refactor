import { combineReducers } from 'redux';

import { convertArrToObj, removeObjItem } from 'helpers/generic';

import {
    FETCH_USER_DRAWINGS_REQUEST,
    FETCH_USER_DRAWINGS_SUCCESS,
    FETCH_USER_DRAWINGS_FAILURE,
    REMOVE_USER_DRAWINGS_ACCESS_REQUEST,
    REMOVE_USER_DRAWINGS_ACCESS_SUCCESS,
    REMOVE_USER_DRAWINGS_ACCESS_FAILURE
} from 'constants/actionTypes/usersManagement';

export default combineReducers({
    userDrawings: userDrawingsReducer,
    isFetching: isFetchingReducer,
    error: errorReducer,
    isRemoving: isRemovingReducer,
    removeError: removeErrorReducer,
    removeSuccess: removeSuccessReducer
});

function userDrawingsReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_USER_DRAWINGS_SUCCESS:
            return convertArrToObj(action.payload);
        case REMOVE_USER_DRAWINGS_ACCESS_FAILURE:
            return removeObjItem(state, action.id);
        default:
            return state;
    }
}

function isFetchingReducer(state = false, action) {
    switch (action.type) {
        case FETCH_USER_DRAWINGS_REQUEST:
            return true;
        case FETCH_USER_DRAWINGS_SUCCESS:
        case FETCH_USER_DRAWINGS_FAILURE:
            return false;
        default:
            return state;
    }
}

function isRemovingReducer(state = false, action) {
    switch (action.type) {
        case REMOVE_USER_DRAWINGS_ACCESS_REQUEST:
            return true;
        case REMOVE_USER_DRAWINGS_ACCESS_SUCCESS:
        case REMOVE_USER_DRAWINGS_ACCESS_FAILURE:
            return false;
        default:
            return state;
    }
}

function removeSuccessReducer(state = false, action) {
    switch (action.type) {
        case REMOVE_USER_DRAWINGS_ACCESS_REQUEST:
            return false;
        case REMOVE_USER_DRAWINGS_ACCESS_SUCCESS:
            return true;
        default:
            return state;
    }
}

function removeErrorReducer(state = null, action) {
    switch (action.type) {
        case REMOVE_USER_DRAWINGS_ACCESS_REQUEST:
            return null;
        case REMOVE_USER_DRAWINGS_ACCESS_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function errorReducer(state = null, action) {
    switch (action.type) {
        case FETCH_USER_DRAWINGS_REQUEST:
            return null;
        case FETCH_USER_DRAWINGS_FAILURE:
            return action.error;
        default:
            return state;
    }
}
