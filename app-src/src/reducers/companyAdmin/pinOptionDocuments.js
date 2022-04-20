import { combineReducers } from 'redux';

import { convertArrToObj, updateObj } from 'helpers/generic';
import {
    CREATE_PIN_OPTION_DOCUMENT_FAILURE,
    CREATE_PIN_OPTION_DOCUMENT_REQUEST,
    CREATE_PIN_OPTION_DOCUMENT_SUCCESS,
    DELETE_PIN_OPTION_DOCUMENT_FAILURE,
    DELETE_PIN_OPTION_DOCUMENT_REQUEST,
    DELETE_PIN_OPTION_DOCUMENT_SUCCESS,
    EDIT_PIN_OPTION_DOCUMENT_FAILURE,
    EDIT_PIN_OPTION_DOCUMENT_REQUEST,
    EDIT_PIN_OPTION_DOCUMENT_SUCCESS,
    FETCH_PIN_OPTION_DOCUMENTS_FAILURE,
    FETCH_PIN_OPTION_DOCUMENTS_REQUEST,
    FETCH_PIN_OPTION_DOCUMENTS_SUCCESS,
    FETCH_PIN_OPTION_DOCUMENTS_VERSIONS_FAILURE,
    FETCH_PIN_OPTION_DOCUMENTS_VERSIONS_REQUEST,
    FETCH_PIN_OPTION_DOCUMENTS_VERSIONS_SUCCESS,
} from 'constants/actionTypes/pinOptionsDocuments';

export default combineReducers({
    documents: pinOptionDocumentsReducer,
    isFetching: isFetchingReducer,
    fetchError: fetchErrorReducer,
    isPosting: isPostingReducer,
    postError: postErrorReducer,
    postSuccess: postSuccessReducer,
});

function isFetchingReducer(state = false, action) {
    switch (action.type) {
        case FETCH_PIN_OPTION_DOCUMENTS_REQUEST:
        case FETCH_PIN_OPTION_DOCUMENTS_VERSIONS_REQUEST:
            return true;
        case FETCH_PIN_OPTION_DOCUMENTS_SUCCESS:
        case FETCH_PIN_OPTION_DOCUMENTS_FAILURE:
        case FETCH_PIN_OPTION_DOCUMENTS_VERSIONS_SUCCESS:
        case FETCH_PIN_OPTION_DOCUMENTS_VERSIONS_FAILURE:
            return false;
        default:
            return state;
    }
}

function fetchErrorReducer(state = null, action) {
    switch (action.type) {
        case FETCH_PIN_OPTION_DOCUMENTS_REQUEST:
            return null;
        case FETCH_PIN_OPTION_DOCUMENTS_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function isPostingReducer(state = false, action) {
    switch (action.type) {
        case CREATE_PIN_OPTION_DOCUMENT_REQUEST:
        case EDIT_PIN_OPTION_DOCUMENT_REQUEST:
        case DELETE_PIN_OPTION_DOCUMENT_REQUEST:
            return true;
        case CREATE_PIN_OPTION_DOCUMENT_SUCCESS:
        case CREATE_PIN_OPTION_DOCUMENT_FAILURE:
        case EDIT_PIN_OPTION_DOCUMENT_SUCCESS:
        case EDIT_PIN_OPTION_DOCUMENT_FAILURE:
        case DELETE_PIN_OPTION_DOCUMENT_SUCCESS:
        case DELETE_PIN_OPTION_DOCUMENT_FAILURE:
            return false;
        default:
            return state;
    }
}

function postErrorReducer(state = null, action) {
    switch (action.type) {
        case CREATE_PIN_OPTION_DOCUMENT_REQUEST:
        case EDIT_PIN_OPTION_DOCUMENT_REQUEST:
        case DELETE_PIN_OPTION_DOCUMENT_REQUEST:
            return null;
        case CREATE_PIN_OPTION_DOCUMENT_FAILURE:
        case EDIT_PIN_OPTION_DOCUMENT_FAILURE:
        case DELETE_PIN_OPTION_DOCUMENT_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function postSuccessReducer(state = false, action) {
    switch (action.type) {
        case CREATE_PIN_OPTION_DOCUMENT_REQUEST:
        case EDIT_PIN_OPTION_DOCUMENT_REQUEST:
        case DELETE_PIN_OPTION_DOCUMENT_REQUEST:
            return false;
        case EDIT_PIN_OPTION_DOCUMENT_SUCCESS:
        case DELETE_PIN_OPTION_DOCUMENT_SUCCESS:
            return true;
        default:
            return state;
    }
}

function pinOptionDocumentsReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_PIN_OPTION_DOCUMENTS_SUCCESS:
            return convertArrToObj(action.payload);
        case EDIT_PIN_OPTION_DOCUMENT_SUCCESS:
        case DELETE_PIN_OPTION_DOCUMENT_SUCCESS:
            return updateObj(state, action.payload.id, action.payload);
        default:
            return state;
    }
}
