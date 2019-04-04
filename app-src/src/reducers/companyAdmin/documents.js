import { combineReducers } from 'redux';

import { convertArrToObj, updateObj, removeObjItem } from 'helpers/generic';
import {
    FETCH_DOCUMENTS_REQUEST,
    FETCH_SINGLE_DOCUMENT_REQUEST,
    FETCH_DOCUMENTS_SUCCESS,
    FETCH_SINGLE_DOCUMENT_SUCCESS,
    FETCH_DOCUMENTS_FAILURE,
    FETCH_SINGLE_DOCUMENT_FAILURE,
    CREATE_DOCUMENT_REQUEST,
    CREATE_DOCUMENT_FAILURE,
    CREATE_DOCUMENT_SUCCESS,
    EDIT_DOCUMENT_REQUEST,
    EDIT_DOCUMENT_FAILURE,
    EDIT_DOCUMENT_SUCCESS,
    DELETE_DOCUMENT_REQUEST,
    DELETE_DOCUMENT_SUCCESS,
    DELETE_DOCUMENT_FAILURE
} from 'constants/actionTypes/documents';

export default combineReducers({
    documents: documentsReducer,
    isFetching: isFetchingReducer,
    postSuccess: postSuccessReducer,
    error: errorReducer,
    updatedDocumentID: updatedDocumentIDReducer,
    isDeleting: isDeletingReducer,
    deletionError: deletionErrorReducer,
    deleteSuccess: deleteSuccessReducer
});

function isFetchingReducer(state = false, action) {
    switch (action.type) {
        case FETCH_DOCUMENTS_REQUEST:
        case FETCH_SINGLE_DOCUMENT_REQUEST:
        case CREATE_DOCUMENT_REQUEST:
            return true;
        case FETCH_DOCUMENTS_SUCCESS:
        case FETCH_SINGLE_DOCUMENT_SUCCESS:
        case FETCH_DOCUMENTS_FAILURE:
        case FETCH_SINGLE_DOCUMENT_FAILURE:
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
        case FETCH_SINGLE_DOCUMENT_REQUEST:
        case CREATE_DOCUMENT_REQUEST:
        case EDIT_DOCUMENT_REQUEST:
            return null;
        case FETCH_DOCUMENTS_FAILURE:
        case FETCH_SINGLE_DOCUMENT_FAILURE:
        case CREATE_DOCUMENT_FAILURE:
        case EDIT_DOCUMENT_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function isDeletingReducer(state = false, action) {
    switch (action.type) {
        case DELETE_DOCUMENT_REQUEST:
            return true;
        case DELETE_DOCUMENT_SUCCESS:
        case DELETE_DOCUMENT_FAILURE:
            return false;
        default:
            return state;
    }
}

function deletionErrorReducer(state = null, action) {
    switch (action.type) {
        case DELETE_DOCUMENT_REQUEST:
            return null;
        case DELETE_DOCUMENT_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function deleteSuccessReducer(state = false, action) {
    switch (action.type) {
        case DELETE_DOCUMENT_REQUEST:
            return false;
        case DELETE_DOCUMENT_SUCCESS:
            return true;
        default:
            return state;
    }
}

function documentsReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_DOCUMENTS_SUCCESS:
            return convertArrToObj(action.payload);
        case FETCH_SINGLE_DOCUMENT_SUCCESS:
        case CREATE_DOCUMENT_SUCCESS:
        case EDIT_DOCUMENT_SUCCESS:
            return updateObj(state, action.payload.id, action.payload);
        case DELETE_DOCUMENT_SUCCESS:
            return removeObjItem(state, action.id);
        default:
            return state;
    }
}

function updatedDocumentIDReducer(state = 0, action) {
    switch (action.type) {
        case CREATE_DOCUMENT_REQUEST:
        case EDIT_DOCUMENT_REQUEST:
            return 0;
        case CREATE_DOCUMENT_SUCCESS:
        case EDIT_DOCUMENT_SUCCESS:
            return action.payload.id;
        default:
            return state;
    }
}

function postSuccessReducer(state = false, action) {
    switch (action.type) {
        case CREATE_DOCUMENT_REQUEST:
        case EDIT_DOCUMENT_REQUEST:
            return false;
        case CREATE_DOCUMENT_SUCCESS:
        case EDIT_DOCUMENT_SUCCESS:
            return true;
        default:
            return state;
    }
}
