import { combineReducers } from 'redux';

import {
    FETCH_SINGLE_COMPANY_REQUEST,
    FETCH_SINGLE_COMPANY_SUCCESS,
    FETCH_SINGLE_COMPANY_FAILURE,
    FETCH_ALL_COMPANIES_REQUEST,
    FETCH_ALL_COMPANIES_SUCCESS,
    FETCH_ALL_COMPANIES_FAILURE,
    FETCH_COMPANY_PERMISSIONS_REQUEST,
    FETCH_COMPANY_PERMISSIONS_SUCCESS,
    FETCH_COMPANY_PERMISSIONS_FAILURE,
    ADD_COMPANY_REQUEST,
    ADD_COMPANY_SUCCESS,
    ADD_COMPANY_FAILURE,
    DELETE_COMPANY_PERMISSIONS_REQUEST,
    DELETE_COMPANY_PERMISSIONS_SUCCESS,
    DELETE_COMPANY_PERMISSIONS_FAILURE,
    UPDATE_COMPANIES_FILTERS
} from 'constants/actionTypes/companies';
import { updateObj, removeObjItem } from 'helpers/generic';

export default combineReducers({
    company: companyReducer,
    companies: companiesReducer,
    companiesWithPermissions: companiesWithPermissionsReducer,
    filters: filtersReducer,
    isFetching: isFetchingReducer,
    isPosting: isPostingReducer,
    error: errorReducer,
    postSuccess: postSuccessReducer
});

function isFetchingReducer(state = false, action) {
    switch (action.type) {
        case FETCH_SINGLE_COMPANY_REQUEST:
        case FETCH_ALL_COMPANIES_REQUEST:
        case FETCH_COMPANY_PERMISSIONS_REQUEST:
            return true;
        case FETCH_SINGLE_COMPANY_SUCCESS:
        case FETCH_SINGLE_COMPANY_FAILURE:
        case FETCH_ALL_COMPANIES_SUCCESS:
        case FETCH_ALL_COMPANIES_FAILURE:
        case FETCH_COMPANY_PERMISSIONS_SUCCESS:
        case FETCH_COMPANY_PERMISSIONS_FAILURE:
            return false;
        default:
            return state;
    }
}

function isPostingReducer(state = false, action) {
    switch (action.type) {
        case ADD_COMPANY_REQUEST:
        case DELETE_COMPANY_PERMISSIONS_REQUEST:
            return true;
        case ADD_COMPANY_SUCCESS:
        case ADD_COMPANY_FAILURE:
        case DELETE_COMPANY_PERMISSIONS_SUCCESS:
        case DELETE_COMPANY_PERMISSIONS_FAILURE:
            return false;
        default:
            return state;
    }
}

function errorReducer(state = null, action) {
    switch (action.type) {
        case FETCH_SINGLE_COMPANY_REQUEST:
        case FETCH_ALL_COMPANIES_REQUEST:
        case FETCH_COMPANY_PERMISSIONS_REQUEST:
            return null;
        case FETCH_SINGLE_COMPANY_FAILURE:
        case FETCH_ALL_COMPANIES_FAILURE:
        case FETCH_COMPANY_PERMISSIONS_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function postSuccessReducer(state = false, action) {
    switch (action.type) {
        case ADD_COMPANY_FAILURE:
        case ADD_COMPANY_REQUEST:
        case DELETE_COMPANY_PERMISSIONS_REQUEST:
        case DELETE_COMPANY_PERMISSIONS_FAILURE:
            return false;
        case ADD_COMPANY_SUCCESS:
        case DELETE_COMPANY_PERMISSIONS_SUCCESS:
            return true;
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

function companiesWithPermissionsReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_COMPANY_PERMISSIONS_SUCCESS:
            return action.payload;
        case DELETE_COMPANY_PERMISSIONS_SUCCESS:
            return state.filter(company => company.id !== action.payload.id);
        default:
            return state;
    }
}

// TODO: add starting state
function filtersReducer(state = { name: '' }, action) {
    switch (action.type) {
        case UPDATE_COMPANIES_FILTERS:
            return updateObj(state, action.fieldName, action.searchTerm);
        default:
            return state;
    }
}
