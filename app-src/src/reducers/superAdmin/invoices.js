import { combineReducers } from 'redux';

import {
    ADMIN_FETCH_COMPANY_INVOICES_REQUEST,
    ADMIN_FETCH_COMPANY_INVOICES_SUCCESS,
    ADMIN_FETCH_COMPANY_INVOICES_FAILURE
} from 'constants/actionTypes/invoices';
import { convertArrToObj } from 'helpers/generic';

export default combineReducers({
    invoices: invoicesReducer,
    isFetching: isFetchingReducer,
    error: errorReducer
});

function isFetchingReducer(state = false, action) {
    switch (action.type) {
        case ADMIN_FETCH_COMPANY_INVOICES_REQUEST:
            return true;
        case ADMIN_FETCH_COMPANY_INVOICES_SUCCESS:
        case ADMIN_FETCH_COMPANY_INVOICES_FAILURE:
            return false;
        default:
            return state;
    }
}

function errorReducer(state = null, action) {
    switch (action.type) {
        case ADMIN_FETCH_COMPANY_INVOICES_REQUEST:
            return null;
        case ADMIN_FETCH_COMPANY_INVOICES_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function invoicesReducer(state = {}, action) {
    switch (action.type) {
        case ADMIN_FETCH_COMPANY_INVOICES_SUCCESS:
            return { ...state, ...convertArrToObj(action.payload) };
        default:
            return state;
    }
}
