import { combineReducers } from 'redux';

import { convertArrToObj } from 'helpers/generic';
import {
    ADMIN_FETCH_PIN_OPTION_DOCUMENTS_VERSIONS_FAILURE,
    ADMIN_FETCH_PIN_OPTION_DOCUMENTS_VERSIONS_REQUEST,
    ADMIN_FETCH_PIN_OPTION_DOCUMENTS_VERSIONS_SUCCESS,
} from 'constants/actionTypes/pinOptionsDocuments';

export default combineReducers({
    documentsVersions: pinOptionDocumentsVersionsReducer,
    isFetching: isFetchingReducer,
    errorReducer: errorReducer,
});

function isFetchingReducer(state = false, action) {
    switch (action.type) {
        case ADMIN_FETCH_PIN_OPTION_DOCUMENTS_VERSIONS_REQUEST:
            return true;
        case ADMIN_FETCH_PIN_OPTION_DOCUMENTS_VERSIONS_SUCCESS:
        case ADMIN_FETCH_PIN_OPTION_DOCUMENTS_VERSIONS_FAILURE:
            return false;
        default:
            return state;
    }
}

function errorReducer(state = null, action) {
    switch (action.type) {
        case ADMIN_FETCH_PIN_OPTION_DOCUMENTS_VERSIONS_REQUEST:
            return null;
        case ADMIN_FETCH_PIN_OPTION_DOCUMENTS_VERSIONS_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function pinOptionDocumentsVersionsReducer(state = {}, action) {
    switch (action.type) {
        case ADMIN_FETCH_PIN_OPTION_DOCUMENTS_VERSIONS_SUCCESS:
            return convertArrToObj(action.payload);
        default:
            return state;
    }
}
