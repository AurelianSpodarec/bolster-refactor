import { combineReducers } from 'redux';

import { convertArrToObj } from 'helpers/generic';
import {
    FETCH_DOCUMENTS_REQUEST,
    FETCH_DOCUMENTS_SUCCESS,
    FETCH_DOCUMENTS_FAILURE
} from 'constants/actionTypes/documents';

export default combineReducers({
    documents: documentsReducer,
    isFetching: isFetchingReducer,
    error: errorReducer
});

function isFetchingReducer(state = false, action) {
    switch (action.type) {
        case FETCH_DOCUMENTS_REQUEST:
            return true;
        case FETCH_DOCUMENTS_SUCCESS:
        case FETCH_DOCUMENTS_FAILURE:
            return false;
        default:
            return state;
    }
}

function errorReducer(state = null, action) {
    switch (action.type) {
        case FETCH_DOCUMENTS_REQUEST:
            return null;
        case FETCH_DOCUMENTS_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function documentsReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_DOCUMENTS_SUCCESS:
            return { ...state, ...convertArrToObj(action.payload) };
        default:
            return state;
    }
}
