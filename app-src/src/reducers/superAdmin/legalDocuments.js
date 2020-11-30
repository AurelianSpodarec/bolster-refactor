import { combineReducers } from 'redux';

import {
    FETCH_ALL_LEGAL_DOCUMENTS_REQUEST,
    FETCH_ALL_LEGAL_DOCUMENTS_SUCCESS,
    FETCH_ALL_LEGAL_DOCUMENTS_FAILURE,
} from 'constants/actionTypes/legalDocuments';
import { convertArrToObj } from 'helpers/generic';

export default combineReducers({
    legalDocuments: legalDocumentsReducer,
    isFetching: isFetchingReducer,
    error: errorReducer,
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
