import { combineReducers } from 'redux';

import {
    SHARED_FETCH_TERMS_REQUEST,
    SHARED_FETCH_TERMS_SUCCESS,
    SHARED_FETCH_TERMS_FAILURE,
    UPDATE_TERMS_CANCEL_COUNT_REQUEST,
    UPDATE_TERMS_CANCEL_COUNT_SUCCESS,
    UPDATE_TERMS_CANCEL_COUNT_FAILURE,
} from 'constants/actionTypes/legalDocuments';

export default combineReducers({
    docs: docsReducer,
    fetchError: fetchErrorReducer,
    fetchSuccess: fetchSuccessReducer,
    isFetching: isFetchingReducer,
    isPosting: isPostingReducer,
});

function docsReducer(state = {}, action) {
    switch (action.type) {
        case SHARED_FETCH_TERMS_SUCCESS:
            return action.payload;
        default:
            return state;
    }
}

function isFetchingReducer(state = false, action) {
    switch (action.type) {
        case SHARED_FETCH_TERMS_REQUEST:
            return true;
        case SHARED_FETCH_TERMS_SUCCESS:
        case SHARED_FETCH_TERMS_FAILURE:
            return false;
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
function isPostingReducer(state = false, action) {
    switch (action.type) {
        case UPDATE_TERMS_CANCEL_COUNT_REQUEST:
            return true;
        case UPDATE_TERMS_CANCEL_COUNT_SUCCESS:
        case UPDATE_TERMS_CANCEL_COUNT_FAILURE:
            return false;
        default:
            return state;
    }
}
