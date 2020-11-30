import { combineReducers } from 'redux';

import {
    FETCH_ALL_LEGAL_DOCUMENTS_REQUEST,
    FETCH_ALL_LEGAL_DOCUMENTS_SUCCESS,
    FETCH_ALL_LEGAL_DOCUMENTS_FAILURE,
    POST_LEGAL_DOCUMENT_REQUEST,
    POST_LEGAL_DOCUMENT_SUCCESS,
    POST_LEGAL_DOCUMENT_FAILURE,
    UPDATE_LEGAL_DOCUMENT_REQUEST,
    UPDATE_LEGAL_DOCUMENT_SUCCESS,
    UPDATE_LEGAL_DOCUMENT_FAILURE,
} from 'constants/actionTypes/legalDocuments';
import { convertArrToObj } from 'helpers/generic';

export default combineReducers({
    legalDocuments: legalDocumentsReducer,
    isFetching: isFetchingReducer,
    error: errorReducer,
    postIsFetching: postLegalDocumentFetchingReducer,
    postError: postLegalDocumentErrorReducer,
    postSuccess: postLegalDocumentSuccessReducer,
});

function isFetchingReducer(state = false, action) {
    switch (action.type) {
        case FETCH_ALL_LEGAL_DOCUMENTS_REQUEST:
            return true;
        case FETCH_ALL_LEGAL_DOCUMENTS_SUCCESS:
        case FETCH_ALL_LEGAL_DOCUMENTS_FAILURE:
            return false;
        default:
            return state;
    }
}

function errorReducer(state = null, action) {
    switch (action.type) {
        case FETCH_ALL_LEGAL_DOCUMENTS_REQUEST:
            return null;
        case FETCH_ALL_LEGAL_DOCUMENTS_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function legalDocumentsReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_ALL_LEGAL_DOCUMENTS_SUCCESS:
            return convertArrToObj(action.payload);
        default:
            return state;
    }
}

function postLegalDocumentFetchingReducer(state = false, action) {
    switch (action.type) {
        case POST_LEGAL_DOCUMENT_REQUEST:
        case UPDATE_LEGAL_DOCUMENT_REQUEST:
            return true;
        case POST_LEGAL_DOCUMENT_SUCCESS:
        case UPDATE_LEGAL_DOCUMENT_SUCCESS:
        case POST_LEGAL_DOCUMENT_FAILURE:
        case UPDATE_LEGAL_DOCUMENT_FAILURE:
            return false;
        default:
            return state;
    }
}

function postLegalDocumentSuccessReducer(state = false, action) {
    switch (action.type) {
        case POST_LEGAL_DOCUMENT_REQUEST:
        case UPDATE_LEGAL_DOCUMENT_REQUEST:
            return false;
        case POST_LEGAL_DOCUMENT_SUCCESS:
        case UPDATE_LEGAL_DOCUMENT_SUCCESS:
            return true;
        default:
            return state;
    }
}

function postLegalDocumentErrorReducer(state = false, action) {
    switch (action.type) {
        case POST_LEGAL_DOCUMENT_REQUEST:
        case UPDATE_LEGAL_DOCUMENT_REQUEST:
            return false;
        case POST_LEGAL_DOCUMENT_FAILURE:
        case UPDATE_LEGAL_DOCUMENT_FAILURE:
            return true;
        default:
            return state;
    }
}
