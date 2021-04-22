import { combineReducers } from 'redux';

import { convertArrToObj, removeObjItem, updateObj } from 'helpers/generic';

import {
    FETCH_ALL_USER_DOCUMENTS_REQUEST,
    FETCH_ALL_USER_DOCUMENTS_SUCCESS,
    FETCH_ALL_USER_DOCUMENTS_FAILURE,
    POST_UPLOAD_USER_DOCUMENTS_REQUEST,
    POST_UPLOAD_USER_DOCUMENTS_SUCCESS,
    POST_UPLOAD_USER_DOCUMENTS_FAILURE,
    DELETE_USER_DOCUMENTS_REQUEST,
    DELETE_USER_DOCUMENTS_SUCCESS,
    DELETE_USER_DOCUMENTS_FAILURE,
} from 'constants/actionTypes/usersManagement';

export default combineReducers({
    userDocuments: userDocumentsReducer,
    isFetching: isFetchingReducer,
    error: errorReducer,
    isPosting: isPostingReducer,
    postError: postErrorReducer,
    postSuccess: postSuccessReducer,
});

function userDocumentsReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_ALL_USER_DOCUMENTS_REQUEST:
            return {};
        case FETCH_ALL_USER_DOCUMENTS_SUCCESS:
            return convertArrToObj(action.payload);
        case DELETE_USER_DOCUMENTS_SUCCESS:
            return removeObjItem(state, action.id);
        case POST_UPLOAD_USER_DOCUMENTS_SUCCESS:
            return updateObj(state, action.payload.id, action.payload);
        default:
            return state;
    }
}

function isFetchingReducer(state = false, action) {
    switch (action.type) {
        case FETCH_ALL_USER_DOCUMENTS_REQUEST:
            return true;
        case FETCH_ALL_USER_DOCUMENTS_SUCCESS:
        case FETCH_ALL_USER_DOCUMENTS_FAILURE:
            return false;
        default:
            return state;
    }
}

function isPostingReducer(state = false, action) {
    switch (action.type) {
        case POST_UPLOAD_USER_DOCUMENTS_REQUEST:
        case DELETE_USER_DOCUMENTS_REQUEST:
            return true;
        case POST_UPLOAD_USER_DOCUMENTS_SUCCESS:
        case POST_UPLOAD_USER_DOCUMENTS_FAILURE:
        case DELETE_USER_DOCUMENTS_SUCCESS:
        case DELETE_USER_DOCUMENTS_FAILURE:
            return false;
        default:
            return state;
    }
}

function postSuccessReducer(state = false, action) {
    switch (action.type) {
        case POST_UPLOAD_USER_DOCUMENTS_REQUEST:
        case DELETE_USER_DOCUMENTS_REQUEST:
            return false;
        case POST_UPLOAD_USER_DOCUMENTS_SUCCESS:
        case DELETE_USER_DOCUMENTS_SUCCESS:
            return true;
        default:
            return state;
    }
}

function postErrorReducer(state = null, action) {
    switch (action.type) {
        case POST_UPLOAD_USER_DOCUMENTS_REQUEST:
        case DELETE_USER_DOCUMENTS_REQUEST:
            return null;
        case POST_UPLOAD_USER_DOCUMENTS_FAILURE:
        case DELETE_USER_DOCUMENTS_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function errorReducer(state = null, action) {
    switch (action.type) {
        case FETCH_ALL_USER_DOCUMENTS_REQUEST:
            return null;
        case FETCH_ALL_USER_DOCUMENTS_FAILURE:
            return action.error;
        default:
            return state;
    }
}
