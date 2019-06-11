import { combineReducers } from 'redux';

import { convertArrToObj, updateObj } from 'helpers/generic';
import {
    CLIENT_FETCH_DOCUMENTS_REQUEST,
    CLIENT_FETCH_SINGLE_DOCUMENT_REQUEST,
    CLIENT_FETCH_DOCUMENTS_SUCCESS,
    CLIENT_FETCH_SINGLE_DOCUMENT_SUCCESS,
    CLIENT_FETCH_DOCUMENTS_FAILURE,
    CLIENT_FETCH_SINGLE_DOCUMENT_FAILURE
} from 'constants/actionTypes/documents';

export default combineReducers({
    documents: documentsReducer,
    isFetching: isFetchingReducer,
    error: errorReducer
});

function isFetchingReducer(state = false, action) {
    switch (action.type) {
        case CLIENT_FETCH_DOCUMENTS_REQUEST:
        case CLIENT_FETCH_SINGLE_DOCUMENT_REQUEST:
            return true;
        case CLIENT_FETCH_DOCUMENTS_SUCCESS:
        case CLIENT_FETCH_SINGLE_DOCUMENT_SUCCESS:
        case CLIENT_FETCH_DOCUMENTS_FAILURE:
        case CLIENT_FETCH_SINGLE_DOCUMENT_FAILURE:
            return false;
        default:
            return state;
    }
}

function errorReducer(state = null, action) {
    switch (action.type) {
        case CLIENT_FETCH_DOCUMENTS_REQUEST:
        case CLIENT_FETCH_SINGLE_DOCUMENT_REQUEST:
            return null;
        case CLIENT_FETCH_DOCUMENTS_FAILURE:
        case CLIENT_FETCH_SINGLE_DOCUMENT_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function documentsReducer(state = {}, action) {
    switch (action.type) {
        case CLIENT_FETCH_DOCUMENTS_SUCCESS:
            return convertArrToObj(action.payload);
        case CLIENT_FETCH_SINGLE_DOCUMENT_SUCCESS:
            return updateObj(state, action.payload.id, action.payload);
        default:
            return state;
    }
}
