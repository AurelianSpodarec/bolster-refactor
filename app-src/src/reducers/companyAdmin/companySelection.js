import {
    FETCH_AVAILABLE_COMPANIES_FAILURE,
    FETCH_AVAILABLE_COMPANIES_REQUEST,
    FETCH_AVAILABLE_COMPANIES_SUCCESS,
} from 'constants/actionTypes/companies';
import { combineReducers } from 'redux';

export default combineReducers({
    isFetching: isFetchingReducer,
    error: errorReducer,
    availableCompanies: availableCompaniesReducer,
    isPosting: isPostingReducer,
    postSuccess: postSuccessReducer,
});

function isFetchingReducer(state = false, action) {
    switch (action.type) {
        case FETCH_AVAILABLE_COMPANIES_REQUEST:
            return true;
        case FETCH_AVAILABLE_COMPANIES_SUCCESS:
        case FETCH_AVAILABLE_COMPANIES_FAILURE:
            return false;
        default:
            return state;
    }
}

function isPostingReducer(state = false, action) {
    switch (action.type) {
        default:
            return state;
    }
}

function postSuccessReducer(state = false, action) {
    switch (action.type) {
        default:
            return state;
    }
}

function errorReducer(state = null, action) {
    switch (action.type) {
        case FETCH_AVAILABLE_COMPANIES_REQUEST:
            return null;
        case FETCH_AVAILABLE_COMPANIES_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function availableCompaniesReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_AVAILABLE_COMPANIES_SUCCESS:
            return action.payload;
        default:
            return state;
    }
}
