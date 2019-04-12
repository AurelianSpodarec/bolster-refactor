import { combineReducers } from 'redux';

import {
    FETCH_ALL_COMPANIES_REQUEST,
    FETCH_ALL_COMPANIES_SUCCESS,
    FETCH_ALL_COMPANIES_FAILURE,
    UPDATE_COMPANIES_FILTERS
} from 'constants/actionTypes/companies';
import { convertArrToObj, updateObj } from 'helpers/generic';

export default combineReducers({
    companies: companiesReducer,
    isFetching: isFetchingReducer,
    error: errorReducer,
    filters: filtersReducer
});

function isFetchingReducer(state = false, action) {
    switch (action.type) {
        case FETCH_ALL_COMPANIES_REQUEST:
            return true;
        case FETCH_ALL_COMPANIES_SUCCESS:
        case FETCH_ALL_COMPANIES_FAILURE:
            return false;
        default:
            return state;
    }
}

function filtersReducer(state = { name: '' }, action) {
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
            return null;
        case FETCH_ALL_COMPANIES_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function companiesReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_ALL_COMPANIES_SUCCESS:
            return convertArrToObj(action.payload);
        default:
            return state;
    }
}
