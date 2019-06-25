import { combineReducers } from 'redux';

import {
    ADMIN_FETCH_COMPANY_INVOICES_REQUEST,
    ADMIN_FETCH_COMPANY_INVOICES_SUCCESS,
    ADMIN_FETCH_COMPANY_INVOICES_FAILURE,
    ADMIN_FETCH_COMPANY_INVOICE_ITEMS_SUCCESS,
    ADMIN_FETCH_COMPANY_INVOICE_ITEMS_REQUEST,
    ADMIN_FETCH_COMPANY_INVOICE_ITEMS_FAILURE
} from 'constants/actionTypes/invoices';
import { convertArrToObj } from 'helpers/generic';
import {
    SA_MAKE_INVOICE_FREE_REQUEST,
    SA_MAKE_INVOICE_FREE_FAILURE,
    SA_MAKE_INVOICE_FREE_SUCCESS
} from 'constants/actionTypes/superAdminInvoices';

export default combineReducers({
    invoices: invoicesReducer,
    invoiceItems: invoiceItemsReducer,
    isFetching: isFetchingReducer,
    error: errorReducer,
    postSuccess: postSuccessReducer
});

function isFetchingReducer(state = false, action) {
    switch (action.type) {
        case ADMIN_FETCH_COMPANY_INVOICES_REQUEST:
            return true;
        case ADMIN_FETCH_COMPANY_INVOICES_SUCCESS:
        case ADMIN_FETCH_COMPANY_INVOICES_FAILURE:
        case ADMIN_FETCH_COMPANY_INVOICE_ITEMS_FAILURE:
        case ADMIN_FETCH_COMPANY_INVOICE_ITEMS_SUCCESS:
            return false;
        default:
            return state;
    }
}

function errorReducer(state = null, action) {
    switch (action.type) {
        case ADMIN_FETCH_COMPANY_INVOICES_REQUEST:
        case ADMIN_FETCH_COMPANY_INVOICE_ITEMS_REQUEST:
        case SA_MAKE_INVOICE_FREE_REQUEST:
            return null;
        case SA_MAKE_INVOICE_FREE_FAILURE:
        case ADMIN_FETCH_COMPANY_INVOICES_FAILURE:
        case ADMIN_FETCH_COMPANY_INVOICE_ITEMS_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function postSuccessReducer(state = false, action) {
    switch (action.type) {
        case SA_MAKE_INVOICE_FREE_REQUEST:
            return false;
        case SA_MAKE_INVOICE_FREE_SUCCESS:
            return true;
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

function invoiceItemsReducer(state = {}, action) {
    switch (action.type) {
        case ADMIN_FETCH_COMPANY_INVOICE_ITEMS_SUCCESS:
            return { ...state, ...convertArrToObj(action.payload) };
        default:
            return state;
    }
}
