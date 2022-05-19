import { combineReducers } from 'redux';

import { convertArrToObj, updateObj } from 'helpers/generic';
import {
    ADMIN_FETCH_PIN_OPTION_DOCUMENTS_FAILURE,
    ADMIN_FETCH_PIN_OPTION_DOCUMENTS_REQUEST,
    ADMIN_FETCH_PIN_OPTION_DOCUMENTS_SUCCESS,
    ADMIN_CREATE_PIN_OPTION_DOCUMENT_REQUEST,
    ADMIN_CREATE_PIN_OPTION_DOCUMENT_SUCCESS,
    ADMIN_CREATE_PIN_OPTION_DOCUMENT_FAILURE,
} from 'constants/actionTypes/pinOptionsDocuments';

export default combineReducers({
    documents: pinOptionDocumentsReducer,
    isFetching: isFetchingReducer,
    errorReducer: errorReducer,
    isPosting: isPostingReducer,
    postError: postErrorReducer,
    postSuccess: postSuccessReducer,
});

function isFetchingReducer(state = false, action) {
    switch (action.type) {
        case ADMIN_FETCH_PIN_OPTION_DOCUMENTS_REQUEST:
            return true;
        case ADMIN_FETCH_PIN_OPTION_DOCUMENTS_SUCCESS:
        case ADMIN_FETCH_PIN_OPTION_DOCUMENTS_FAILURE:
            return false;
        default:
            return state;
    }
}

function errorReducer(state = null, action) {
    switch (action.type) {
        case ADMIN_FETCH_PIN_OPTION_DOCUMENTS_REQUEST:
            return null;
        case ADMIN_FETCH_PIN_OPTION_DOCUMENTS_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function pinOptionDocumentsReducer(state = {}, action) {
    switch (action.type) {
        case ADMIN_FETCH_PIN_OPTION_DOCUMENTS_SUCCESS:
            return convertArrToObj(action.payload);
        case ADMIN_CREATE_PIN_OPTION_DOCUMENT_SUCCESS:
            return updateObj(
                state,
                action.payload.pinOptionDocument.id,
                action.payload.pinOptionDocument,
            );
        default:
            return state;
    }
}

function isPostingReducer(state = false, action) {
    switch (action.type) {
        case ADMIN_CREATE_PIN_OPTION_DOCUMENT_REQUEST:
            return true;
        case ADMIN_CREATE_PIN_OPTION_DOCUMENT_SUCCESS:
        case ADMIN_CREATE_PIN_OPTION_DOCUMENT_FAILURE:
            return false;
        default:
            return state;
    }
}

function postErrorReducer(state = null, action) {
    switch (action.type) {
        case ADMIN_CREATE_PIN_OPTION_DOCUMENT_REQUEST:
            return null;
        case ADMIN_CREATE_PIN_OPTION_DOCUMENT_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function postSuccessReducer(state = false, action) {
    switch (action.type) {
        case ADMIN_CREATE_PIN_OPTION_DOCUMENT_REQUEST:
        case ADMIN_CREATE_PIN_OPTION_DOCUMENT_FAILURE:
            return false;
        case ADMIN_CREATE_PIN_OPTION_DOCUMENT_SUCCESS:
            return true;
        default:
            return state;
    }
}
