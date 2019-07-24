import { combineReducers } from 'redux';

import {
    FETCH_ALL_COMPANIES_REQUEST,
    FETCH_ALL_COMPANIES_SUCCESS,
    FETCH_ALL_COMPANIES_FAILURE,
    UPDATE_COMPANIES_FILTERS
} from 'constants/actionTypes/companies';
import { convertArrToObj, updateObj } from 'helpers/generic';
import {
    FETCH_SINGLE_COMPANY_SUCCESS,
    FETCH_SINGLE_COMPANY_REQUEST,
    FETCH_SINGLE_COMPANY_FAILURE
} from 'constants/actionTypes/companiesWithPermissions';

export default combineReducers({
    companies: companiesReducer,
    isFetching: isFetchingReducer,
    error: errorReducer,
    filters: filtersReducer
});

function isFetchingReducer(state = false, action) {
    switch (action.type) {
        case FETCH_ALL_COMPANIES_REQUEST:
        case FETCH_SINGLE_COMPANY_REQUEST:
            return true;
        case FETCH_ALL_COMPANIES_SUCCESS:
        case FETCH_ALL_COMPANIES_FAILURE:
        case FETCH_SINGLE_COMPANY_FAILURE:
        case FETCH_SINGLE_COMPANY_SUCCESS:
            return false;
        default:
            return state;
    }
}

function filtersReducer(state = { name: '', companyType: 0 }, action) {
    switch (action.type) {
        case UPDATE_COMPANIES_FILTERS:
            return updateObj(state, action.fieldName, action.searchTerm);
        default:
            return state;
    }
}

function errorReducer(state = null, action) {
    switch (action.type) {
        case FETCH_ALL_COMPANIES_REQUEST:
        case FETCH_SINGLE_COMPANY_REQUEST:
            return null;
        case FETCH_ALL_COMPANIES_FAILURE:
        case FETCH_SINGLE_COMPANY_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function companiesReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_ALL_COMPANIES_SUCCESS:
            return convertArrToObj(action.payload);
        case FETCH_SINGLE_COMPANY_SUCCESS:
            return updateObj(state, action.payload.id, action.payload);
        default:
            return state;
    }
}
