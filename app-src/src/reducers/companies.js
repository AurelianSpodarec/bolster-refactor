import { combineReducers } from 'redux';

import {
    FETCH_COMPANY_REQUEST,
    FETCH_COMPANY_SUCCESS,
    FETCH_COMPANY_FAILURE,
    FETCH_COMPANIES_REQUEST,
    FETCH_COMPANIES_SUCCESS,
    FETCH_COMPANIES_FAILURE
} from 'constants/actionTypes/companies';

export default combineReducers({
    company: companyReducer,
    companies: companiesReducer,
    isFetching: isFetchingReducer,
    error: errorReducer
});

function isFetchingReducer(state = false, action) {
    switch (action.type) {
        case FETCH_COMPANY_REQUEST:
        case FETCH_COMPANIES_REQUEST:
            return true;
        case FETCH_COMPANY_SUCCESS:
        case FETCH_COMPANY_FAILURE:
        case FETCH_COMPANIES_SUCCESS:
        case FETCH_COMPANIES_FAILURE:
            return false;
        default:
            return state;
    }
}

function errorReducer(state = null, action) {
    switch (action.type) {
        case FETCH_COMPANY_REQUEST:
        case FETCH_COMPANIES_REQUEST:
            return null;
        case FETCH_COMPANY_FAILURE:
        case FETCH_COMPANIES_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function companyReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_COMPANY_SUCCESS:
            return action.payload;
        default:
            return state;
    }
}

function companiesReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_COMPANIES_SUCCESS:
            return action.payload;
        default:
            return state;
    }
}
