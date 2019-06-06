import { combineReducers } from 'redux';

import {
    FETCH_ALL_APPROVED_COMPANIES_REQUEST,
    FETCH_ALL_APPROVED_COMPANIES_SUCCESS,
    FETCH_ALL_APPROVED_COMPANIES_FAILURE
} from 'constants/actionTypes/approvedCompanies';

export default combineReducers({
    approvedCompanies: approvedCompaniesReducer,
    isFetching: isFetchingReducer,
    error: errorReducer
});

function isFetchingReducer(state = false, action) {
    switch (action.type) {
        case FETCH_ALL_APPROVED_COMPANIES_REQUEST:
            return true;
        case FETCH_ALL_APPROVED_COMPANIES_SUCCESS:
        case FETCH_ALL_APPROVED_COMPANIES_FAILURE:
            return false;
        default:
            return state;
    }
}

function errorReducer(state = null, action) {
    switch (action.type) {
        case FETCH_ALL_APPROVED_COMPANIES_REQUEST:
            return null;
        case FETCH_ALL_APPROVED_COMPANIES_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function approvedCompaniesReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_ALL_APPROVED_COMPANIES_SUCCESS:
            return action.payload;
        default:
            return state;
    }
}
