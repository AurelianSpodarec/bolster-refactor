import { combineReducers } from 'redux';

import {
    FETCH_SINGLE_COMPANY_REQUEST,
    FETCH_SINGLE_COMPANY_SUCCESS,
    FETCH_SINGLE_COMPANY_FAILURE,
    FETCH_ALL_COMPANIES_REQUEST,
    FETCH_ALL_COMPANIES_SUCCESS,
    FETCH_ALL_COMPANIES_FAILURE
} from 'constants/actionTypes/companies';

export default combineReducers({
    company: companyReducer,
    companies: companiesReducer,
    isFetching: isFetchingReducer,
    error: errorReducer
});

function isFetchingReducer(state = false, action) {
    switch (action.type) {
        case FETCH_SINGLE_COMPANY_REQUEST:
        case FETCH_ALL_COMPANIES_REQUEST:
            return true;
        case FETCH_SINGLE_COMPANY_SUCCESS:
        case FETCH_SINGLE_COMPANY_FAILURE:
        case FETCH_ALL_COMPANIES_SUCCESS:
        case FETCH_ALL_COMPANIES_FAILURE:
            return false;
        default:
            return state;
    }
}

function errorReducer(state = null, action) {
    switch (action.type) {
        case FETCH_SINGLE_COMPANY_REQUEST:
        case FETCH_ALL_COMPANIES_REQUEST:
            return null;
        case FETCH_SINGLE_COMPANY_FAILURE:
        case FETCH_ALL_COMPANIES_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function companyReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_SINGLE_COMPANY_SUCCESS:
            return action.payload;
        default:
            return state;
    }
}

function companiesReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_ALL_COMPANIES_SUCCESS:
            return action.payload;
        default:
            return state;
    }
}
