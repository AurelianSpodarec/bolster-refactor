import { combineReducers } from 'redux';

import {
    FETCH_COMPANY_REQUEST,
    FETCH_COMPANY_SUCCESS,
    FETCH_COMPANY_FAILURE
} from 'constants/actionTypes/company';

export default combineReducers({
    company: companyReducer,
    isFetching: isFetchingReducer,
    error: errorReducer
});

function isFetchingReducer(state = false, action) {
    switch (action.type) {
        case FETCH_COMPANY_REQUEST:
            return true;
        case FETCH_COMPANY_SUCCESS:
        case FETCH_COMPANY_FAILURE:
            return false;
        default:
            return state;
    }
}

function errorReducer(state = null, action) {
    switch (action.type) {
        case FETCH_COMPANY_REQUEST:
            return null;
        case FETCH_COMPANY_FAILURE:
            return action.error.message;
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
