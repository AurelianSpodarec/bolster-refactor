import { combineReducers } from 'redux';

import { convertArrToObj, updateObj } from 'helpers/generic';
import {
    FETCH_DOCUMENTS_REQUEST,
    FETCH_DOCUMENT_REQUEST,
    FETCH_DOCUMENTS_SUCCESS,
    FETCH_DOCUMENT_SUCCESS,
    FETCH_DOCUMENTS_FAILURE,
    FETCH_DOCUMENT_FAILURE,
    CREATE_DOCUMENT_REQUEST,
    CREATE_DOCUMENT_FAILURE,
    CREATE_DOCUMENT_SUCCESS
} from 'constants/actionTypes/documents';

export default combineReducers({
    documents: documentsReducer,
    isFetching: isFetchingReducer,
    postSuccess: postSuccessReducer,
    error: errorReducer,
    updatedDocumentID: updatedDocumentIDReducer
});

function isFetchingReducer(state = false, action) {
    switch (action.type) {
        case FETCH_DOCUMENTS_REQUEST:
        case FETCH_DOCUMENT_REQUEST:
        case CREATE_DOCUMENT_REQUEST:
            return true;
        case FETCH_DOCUMENTS_SUCCESS:
        case FETCH_DOCUMENT_SUCCESS:
        case FETCH_DOCUMENTS_FAILURE:
        case FETCH_DOCUMENT_FAILURE:
        case CREATE_DOCUMENT_FAILURE:
        case CREATE_DOCUMENT_SUCCESS:
            return false;
        default:
            return state;
    }
}

function errorReducer(state = null, action) {
    switch (action.type) {
        case FETCH_DOCUMENTS_REQUEST:
        case FETCH_DOCUMENT_REQUEST:
        case CREATE_DOCUMENT_REQUEST:
            return null;
        case FETCH_DOCUMENTS_FAILURE:
        case FETCH_DOCUMENT_FAILURE:
        case CREATE_DOCUMENT_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function documentsReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_DOCUMENTS_SUCCESS:
            return convertArrToObj(action.payload);
        case FETCH_DOCUMENT_SUCCESS:
            return updateObj(state, action.payload.id, action.payload);
        case CREATE_DOCUMENT_SUCCESS:
            return updateObj(state, action.payload.id, action.payload);
        default:
            return state;
    }
}

function postSuccessReducer(state = false, action) {
    switch (action.type) {
        case CREATE_DOCUMENT_REQUEST:
            return false;
        case CREATE_DOCUMENT_SUCCESS:
            return true;
        default:
            return state;
    }
}

function updatedDocumentIDReducer(state = 0, action) {
    switch (action.type) {
        case CREATE_DOCUMENT_REQUEST:
            return 0;
        case CREATE_DOCUMENT_SUCCESS:
            return action.payload.id;
        default:
            return state;
    }
}
