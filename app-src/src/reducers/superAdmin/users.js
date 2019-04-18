import { combineReducers } from 'redux';
import {
    FETCH_ALL_USERS_REQUEST,
    FETCH_ALL_USERS_SUCCESS,
    FETCH_ALL_USERS_FAILURE,
    EDIT_USER_FAILURE,
    EDIT_USER_REQUEST,
    EDIT_USER_SUCCESS,
    EDIT_USER_PASSWORD_REQUEST,
    EDIT_USER_PASSWORD_SUCCESS,
    EDIT_USER_PASSWORD_FAILURE,
    UPDATE_USERS_FILTERS,
    ADMIN_FETCH_COMPANY_USERS_REQUEST,
    ADMIN_FETCH_COMPANY_USERS_FAILURE,
    ADMIN_FETCH_COMPANY_USERS_SUCCESS
} from 'constants/actionTypes/users';
import { convertArrToObj, updateObj } from 'helpers/generic';

export default combineReducers({
    error: errorReducer,
    isFetching: isFetchingReducer,
    users: usersReducer,
    postSuccess: postSuccessReducer,
    updatedUserID: updatedUserIDReducer,
    filters: filtersReducer
});

function isFetchingReducer(state = false, action) {
    switch (action.type) {
        case FETCH_ALL_USERS_REQUEST:
        case ADMIN_FETCH_COMPANY_USERS_REQUEST:
            return true;
        case FETCH_ALL_USERS_SUCCESS:
        case FETCH_ALL_USERS_FAILURE:
        case ADMIN_FETCH_COMPANY_USERS_FAILURE:
        case ADMIN_FETCH_COMPANY_USERS_SUCCESS:
            return false;
        default:
            return state;
    }
}

function postSuccessReducer(state = false, action) {
    switch (action.type) {
        case EDIT_USER_REQUEST:
        case EDIT_USER_PASSWORD_REQUEST:
            return false;
        case EDIT_USER_SUCCESS:
        case EDIT_USER_PASSWORD_SUCCESS:
            return true;
        default:
            return state;
    }
}

function errorReducer(state = null, action) {
    switch (action.type) {
        case EDIT_USER_REQUEST:
        case FETCH_ALL_USERS_REQUEST:
        case EDIT_USER_PASSWORD_REQUEST:
        case ADMIN_FETCH_COMPANY_USERS_REQUEST:
            return null;
        case FETCH_ALL_USERS_FAILURE:
        case EDIT_USER_FAILURE:
        case EDIT_USER_PASSWORD_FAILURE:
        case ADMIN_FETCH_COMPANY_USERS_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function usersReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_ALL_USERS_SUCCESS:
            return convertArrToObj(action.payload);
        case EDIT_USER_SUCCESS:
            return updateObj(state, action.payload.id, action.payload);
        case ADMIN_FETCH_COMPANY_USERS_SUCCESS:
            return { ...state, ...convertArrToObj(action.payload) };
        default:
            return state;
    }
}

function updatedUserIDReducer(state = 0, action) {
    switch (action.type) {
        case EDIT_USER_REQUEST:
        case EDIT_USER_PASSWORD_REQUEST:
            return 0;
        case EDIT_USER_SUCCESS:
        case EDIT_USER_PASSWORD_SUCCESS:
            return action.payload.id;
        default:
            return state;
    }
}

function filtersReducer(state = { email: '', role: '' }, action) {
    switch (action.type) {
        case UPDATE_USERS_FILTERS:
            return updateObj(state, action.fieldName, action.searchTerm);
        default:
            return state;
    }
}
