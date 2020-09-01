import { combineReducers } from 'redux';

import {
    SHARED_FETCH_TERMS_REQUEST,
    SHARED_FETCH_TERMS_SUCCESS,
    SHARED_FETCH_TERMS_FAILURE,
} from 'constants/actionTypes/legalDocuments';

export default combineReducers({
    docs: docsReducer,
    fetchError: fetchErrorReducer,
    fetchSuccess: fetchSuccessReducer,
});

function docsReducer(state = {}, action) {
    switch (action.type) {
        case SHARED_FETCH_TERMS_SUCCESS:
            return action.payload;
        default:
            return state;
    }
}

function fetchSuccessReducer(state = false, action) {
    switch (action.type) {
        case SHARED_FETCH_TERMS_SUCCESS:
            return true;
        default:
            return state;
    }
}

function fetchErrorReducer(state = null, action) {
    switch (action.type) {
        case SHARED_FETCH_TERMS_REQUEST:
            return null;
        case SHARED_FETCH_TERMS_FAILURE:
            return action.error;
        default:
            return state;
    }
}
