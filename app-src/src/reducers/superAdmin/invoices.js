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
    SA_FETCH_ALL_INVOICES_REQUEST,
    SA_FETCH_ALL_INVOICES_FAILURE,
    SA_FETCH_ALL_INVOICES_SUCCESS
} from 'constants/actionTypes/superAdminInvoices';

export default combineReducers({
    invoices: invoicesReducer,
    invoiceItems: invoiceItemsReducer,
    isFetching: isFetchingReducer,
    error: errorReducer
});

function isFetchingReducer(state = false, action) {
    switch (action.type) {
        case ADMIN_FETCH_COMPANY_INVOICES_REQUEST:
        case SA_FETCH_ALL_INVOICES_REQUEST:
            return true;
        case ADMIN_FETCH_COMPANY_INVOICES_SUCCESS:
        case ADMIN_FETCH_COMPANY_INVOICES_FAILURE:
        case ADMIN_FETCH_COMPANY_INVOICE_ITEMS_FAILURE:
        case ADMIN_FETCH_COMPANY_INVOICE_ITEMS_SUCCESS:
        case SA_FETCH_ALL_INVOICES_FAILURE:
        case SA_FETCH_ALL_INVOICES_SUCCESS:
            return false;
        default:
            return state;
    }
}

function errorReducer(state = null, action) {
    switch (action.type) {
        case ADMIN_FETCH_COMPANY_INVOICES_REQUEST:
        case ADMIN_FETCH_COMPANY_INVOICE_ITEMS_REQUEST:
        case SA_FETCH_ALL_INVOICES_REQUEST:
            return null;
        case SA_FETCH_ALL_INVOICES_FAILURE:
        case ADMIN_FETCH_COMPANY_INVOICES_FAILURE:
        case ADMIN_FETCH_COMPANY_INVOICE_ITEMS_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function invoicesReducer(state = {}, action) {
    switch (action.type) {
        case ADMIN_FETCH_COMPANY_INVOICES_SUCCESS:
            return { ...state, ...convertArrToObj(action.payload) };
        case SA_FETCH_ALL_INVOICES_SUCCESS:
            return convertArrToObj(action.payload);
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
