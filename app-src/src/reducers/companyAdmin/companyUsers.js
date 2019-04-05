import { combineReducers } from 'redux';

import { convertArrToObj, updateObj, removeObjItem } from 'helpers/generic';
import {
    FETCH_COMPANY_USERS_REQUEST,
    FETCH_COMPANY_USERS_SUCCESS,
    FETCH_COMPANY_USERS_FAILURE,
    CREATE_COMPANY_USER_REQUEST,
    CREATE_COMPANY_USER_SUCCESS,
    CREATE_COMPANY_USER_FAILURE,
    EDIT_COMPANY_USER_REQUEST,
    EDIT_COMPANY_USER_SUCCESS,
    EDIT_COMPANY_USER_FAILURE,
    EDIT_COMPANY_USER_PASSWORD_REQUEST,
    EDIT_COMPANY_USER_PASSWORD_SUCCESS,
    EDIT_COMPANY_USER_PASSWORD_FAILURE,
    DELETE_COMPANY_USER_REQUEST,
    DELETE_COMPANY_USER_SUCCESS,
    DELETE_COMPANY_USER_FAILURE,
    FETCH_SINGLE_COMPANY_USER_REQUEST,
    FETCH_SINGLE_COMPANY_USER_SUCCESS,
    FETCH_SINGLE_COMPANY_USER_FAILURE
} from 'constants/actionTypes/usersManagement';

export default combineReducers({
    users: companyUsersReducer,
    isFetching: isFetchingReducer,
    error: errorReducer,
    isPosting: isPostingReducer,
    postSuccess: postSuccessReducer,
    updatedCompanyUserID: updatedCompanyUserIDReducer
});

function isFetchingReducer(state = false, action) {
    switch (action.type) {
        case FETCH_COMPANY_USERS_REQUEST:
        case FETCH_SINGLE_COMPANY_USER_REQUEST:
            return true;
        case FETCH_COMPANY_USERS_SUCCESS:
        case FETCH_COMPANY_USERS_FAILURE:
        case FETCH_SINGLE_COMPANY_USER_SUCCESS:
        case FETCH_SINGLE_COMPANY_USER_FAILURE:
            return false;
        default:
            return state;
    }
}

function isPostingReducer(state = false, action) {
    switch (action.type) {
        case CREATE_COMPANY_USER_REQUEST:
            return true;
        case CREATE_COMPANY_USER_SUCCESS:
        case CREATE_COMPANY_USER_FAILURE:
            return false;
        default:
            return state;
    }
}

function postSuccessReducer(state = false, action) {
    switch (action.type) {
        case CREATE_COMPANY_USER_REQUEST:
        case EDIT_COMPANY_USER_REQUEST:
        case EDIT_COMPANY_USER_PASSWORD_REQUEST:
            return false;
        case CREATE_COMPANY_USER_SUCCESS:
        case EDIT_COMPANY_USER_SUCCESS:
        case EDIT_COMPANY_USER_PASSWORD_SUCCESS:
            return true;
        default:
            return state;
    }
}

function errorReducer(state = null, action) {
    switch (action.type) {
        case FETCH_COMPANY_USERS_REQUEST:
        case EDIT_COMPANY_USER_REQUEST:
        case EDIT_COMPANY_USER_PASSWORD_REQUEST:
        case CREATE_COMPANY_USER_REQUEST:
        case DELETE_COMPANY_USER_REQUEST:
        case FETCH_SINGLE_COMPANY_USER_REQUEST:
            return null;
        case FETCH_COMPANY_USERS_FAILURE:
        case DELETE_COMPANY_USER_FAILURE:
        case EDIT_COMPANY_USER_FAILURE:
        case EDIT_COMPANY_USER_PASSWORD_FAILURE:
        case CREATE_COMPANY_USER_FAILURE:
        case FETCH_SINGLE_COMPANY_USER_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function updatedCompanyUserIDReducer(state = 0, action) {
    switch (action.type) {
        case CREATE_COMPANY_USER_REQUEST:
        case EDIT_COMPANY_USER_REQUEST:
        case EDIT_COMPANY_USER_PASSWORD_REQUEST:
            return 0;
        case CREATE_COMPANY_USER_SUCCESS:
        case EDIT_COMPANY_USER_SUCCESS:
        case EDIT_COMPANY_USER_PASSWORD_SUCCESS:
            return action.payload.id;
        default:
            return state;
    }
}

function companyUsersReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_COMPANY_USERS_SUCCESS:
            return convertArrToObj(action.payload);
        case CREATE_COMPANY_USER_SUCCESS:
        case EDIT_COMPANY_USER_SUCCESS:
        case FETCH_SINGLE_COMPANY_USER_SUCCESS:
            return updateObj(state, action.payload.id, action.payload);
        case DELETE_COMPANY_USER_SUCCESS:
            return removeObjItem(state, action.id);
        default:
            return state;
    }
}
