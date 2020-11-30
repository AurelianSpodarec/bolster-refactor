import { combineReducers } from 'redux';

import {
    COMPANY_FETCH_TERMS_REQUEST,
    COMPANY_FETCH_TERMS_SUCCESS,
    COMPANY_FETCH_TERMS_FAILURE,
    COMPANY_AGREE_TO_TERMS_REQUEST,
    COMPANY_AGREE_TO_TERMS_FAILURE,
} from 'constants/actionTypes/legalDocuments';

export default combineReducers({
    terms: termsReducer,
    patchError: patchErrorReducer,
    fetchError: fetchErrorReducer,
    fetchSuccess: fetchSuccessReducer,
});

function termsReducer(state = {}, action) {
    switch (action.type) {
        case COMPANY_FETCH_TERMS_SUCCESS:
            return action.payload;
        default:
            return state;
    }
}

function fetchSuccessReducer(state = false, action) {
    switch (action.type) {
        case COMPANY_FETCH_TERMS_SUCCESS:
            return true;
        default:
            return state;
    }
}

function fetchErrorReducer(state = null, action) {
    switch (action.type) {
        case COMPANY_FETCH_TERMS_REQUEST:
            return null;
        case COMPANY_FETCH_TERMS_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function patchErrorReducer(state = null, action) {
    switch (action.type) {
        case COMPANY_AGREE_TO_TERMS_REQUEST:
            return null;
        case COMPANY_AGREE_TO_TERMS_FAILURE:
            return action.error;
        default:
            return state;
    }
}
