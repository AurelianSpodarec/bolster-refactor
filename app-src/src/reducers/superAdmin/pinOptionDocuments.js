import { combineReducers } from 'redux';

import { convertArrToObj } from 'helpers/generic';
import {
    ADMIN_FETCH_PIN_OPTION_DOCUMENTS_FAILURE,
    ADMIN_FETCH_PIN_OPTION_DOCUMENTS_REQUEST,
    ADMIN_FETCH_PIN_OPTION_DOCUMENTS_SUCCESS,
} from 'constants/actionTypes/pinOptionsDocuments';

export default combineReducers({
    documents: pinOptionDocumentsReducer,
    isFetching: isFetchingReducer,
    errorReducer: errorReducer,
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
        default:
            return state;
    }
}
