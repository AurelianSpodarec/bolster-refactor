import { combineReducers } from 'redux';

import { convertArrToObj, updateObj } from 'helpers/generic';
import {
    FETCH_PIN_OPTION_DOCUMENTS_VERSIONS_FAILURE,
    FETCH_PIN_OPTION_DOCUMENTS_VERSIONS_REQUEST,
    FETCH_PIN_OPTION_DOCUMENTS_VERSIONS_SUCCESS,
    CREATE_PIN_OPTION_DOCUMENT_SUCCESS,
    EDIT_PIN_OPTION_DOCUMENT_SUCCESS,
} from 'constants/actionTypes/pinOptionsDocuments';

export default combineReducers({
    documentsVersions: pinOptionDocumentsVersionsReducer,
    isFetching: isFetchingReducer,
    errorReducer: errorReducer,
});

function isFetchingReducer(state = false, action) {
    switch (action.type) {
        case FETCH_PIN_OPTION_DOCUMENTS_VERSIONS_REQUEST:
            return true;
        case FETCH_PIN_OPTION_DOCUMENTS_VERSIONS_SUCCESS:
        case FETCH_PIN_OPTION_DOCUMENTS_VERSIONS_FAILURE:
            return false;
        default:
            return state;
    }
}

function errorReducer(state = null, action) {
    switch (action.type) {
        case FETCH_PIN_OPTION_DOCUMENTS_VERSIONS_REQUEST:
            return null;
        case FETCH_PIN_OPTION_DOCUMENTS_VERSIONS_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function pinOptionDocumentsVersionsReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_PIN_OPTION_DOCUMENTS_VERSIONS_SUCCESS:
            return convertArrToObj(action.payload);
        case CREATE_PIN_OPTION_DOCUMENT_SUCCESS:
            return updateObj(
                state,
                action.payload.pinOptionDocumentVersion.id,
                action.payload.pinOptionDocumentVersion,
            );
        case EDIT_PIN_OPTION_DOCUMENT_SUCCESS:
            return updateObj(state, action.payload.id, action.payload);
        default:
            return state;
    }
}
