import { combineReducers } from 'redux';

import {
    SA_FETCH_ALL_INVOICES_REQUEST,
    SA_FETCH_ALL_INVOICES_SUCCESS,
    SA_FETCH_ALL_INVOICES_FAILURE,
    ADMIN_FETCH_COMPANY_INVOICES_REQUEST,
    ADMIN_FETCH_COMPANY_INVOICES_SUCCESS,
    ADMIN_FETCH_COMPANY_INVOICES_FAILURE,
    ADMIN_FETCH_COMPANY_INVOICE_ITEMS_SUCCESS,
    ADMIN_FETCH_COMPANY_INVOICE_ITEMS_REQUEST,
    ADMIN_FETCH_COMPANY_INVOICE_ITEMS_FAILURE,
    SA_MAKE_INVOICE_FREE_REQUEST,
    SA_MAKE_INVOICE_FREE_FAILURE,
    SA_MAKE_INVOICE_FREE_SUCCESS,
    UPDATE_INVOICE_FILTERS,
    SA_SET_IS_INVOICE_PAID_REQUEST,
    SA_SET_IS_INVOICE_PAID_FAILURE,
    SA_SET_IS_INVOICE_PAID_SUCCESS,
    SA_DELETE_INVOICE_FAILURE,
    SA_DELETE_INVOICE_SUCCESS,
    SA_DELETE_INVOICE_REQUEST,
    SA_FETCH_INVOICES_COUNT_SUCCESS,
    SA_FETCH_INVOICES_BY_SEARCH_SUCCESS,
    SA_FETCH_INVOICES_BY_SEARCH_FAILURE,
    SA_FETCH_INVOICES_BY_SEARCH_REQUEST,
    SA_RESET_INVOICES,
} from 'constants/actionTypes/superAdminInvoices';
import { convertArrToObj, updateObj, removeObjItem } from 'helpers/generic';
import { HIDE_MODAL } from 'constants/actionTypes/generic';

export default combineReducers({
    invoices: invoicesReducer,
    invoiceItems: invoiceItemsReducer,
    isFetching: isFetchingReducer,
    isDeleting: isDeletingReducer,
    deleteSuccess: deleteSuccessReducer,
    error: errorReducer,
    postSuccess: postSuccessReducer,
    filters: filtersReducer,
    count: countReducer,
});

function isFetchingReducer(state = false, action) {
    switch (action.type) {
        case SA_FETCH_ALL_INVOICES_REQUEST:
        case ADMIN_FETCH_COMPANY_INVOICES_REQUEST:
        case SA_FETCH_INVOICES_BY_SEARCH_REQUEST:
            return true;
        case SA_FETCH_ALL_INVOICES_SUCCESS:
        case ADMIN_FETCH_COMPANY_INVOICES_SUCCESS:
        case ADMIN_FETCH_COMPANY_INVOICES_FAILURE:
        case ADMIN_FETCH_COMPANY_INVOICE_ITEMS_FAILURE:
        case ADMIN_FETCH_COMPANY_INVOICE_ITEMS_SUCCESS:
        case SA_FETCH_INVOICES_BY_SEARCH_FAILURE:
        case SA_FETCH_INVOICES_BY_SEARCH_SUCCESS:
            return false;
        default:
            return state;
    }
}

function isDeletingReducer(state = false, action) {
    switch (action.type) {
        case SA_DELETE_INVOICE_REQUEST:
            return true;
        case SA_DELETE_INVOICE_SUCCESS:
        case SA_DELETE_INVOICE_FAILURE:
            return false;
        default:
            return state;
    }
}

function errorReducer(state = null, action) {
    switch (action.type) {
        case SA_FETCH_ALL_INVOICES_REQUEST:
        case ADMIN_FETCH_COMPANY_INVOICES_REQUEST:
        case ADMIN_FETCH_COMPANY_INVOICE_ITEMS_REQUEST:
        case SA_MAKE_INVOICE_FREE_REQUEST:
        case SA_SET_IS_INVOICE_PAID_REQUEST:
        case SA_DELETE_INVOICE_REQUEST:
            return null;

        case SA_FETCH_ALL_INVOICES_FAILURE:
        case SA_MAKE_INVOICE_FREE_FAILURE:
        case ADMIN_FETCH_COMPANY_INVOICES_FAILURE:
        case ADMIN_FETCH_COMPANY_INVOICE_ITEMS_FAILURE:
        case SA_SET_IS_INVOICE_PAID_FAILURE:
        case SA_DELETE_INVOICE_FAILURE:
        case SA_FETCH_INVOICES_BY_SEARCH_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function postSuccessReducer(state = false, action) {
    switch (action.type) {
        case SA_MAKE_INVOICE_FREE_REQUEST:
        case SA_SET_IS_INVOICE_PAID_REQUEST:
            return false;
        case SA_MAKE_INVOICE_FREE_SUCCESS:
        case SA_SET_IS_INVOICE_PAID_SUCCESS:
            return true;
        default:
            return state;
    }
}

function deleteSuccessReducer(state = false, action) {
    switch (action.type) {
        case SA_DELETE_INVOICE_REQUEST:
        case HIDE_MODAL:
            return false;
        case SA_DELETE_INVOICE_SUCCESS:
            return true;
        default:
            return state;
    }
}

function invoicesReducer(state = {}, action) {
    switch (action.type) {
        case SA_RESET_INVOICES:
            return {};
        case SA_FETCH_ALL_INVOICES_SUCCESS:
            return convertArrToObj(action.payload);
        case ADMIN_FETCH_COMPANY_INVOICES_SUCCESS:
            return { ...state, ...convertArrToObj(action.payload) };
        case SA_FETCH_INVOICES_BY_SEARCH_SUCCESS:
            return convertArrToObj(action.payload.invoices);
        case SA_DELETE_INVOICE_SUCCESS:
            return removeObjItem(state, action.id);
        default:
            return state;
    }
}

function countReducer(state = 0, action) {
    switch (action.type) {
        case SA_FETCH_ALL_INVOICES_SUCCESS:
            return action.payload.length;
        case SA_FETCH_INVOICES_BY_SEARCH_SUCCESS:
        case SA_FETCH_INVOICES_COUNT_SUCCESS:
            return action.payload.count;
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

function filtersReducer(state = { searchTerm: '', paymentType: 0, hasPayed: '0' }, action) {
    switch (action.type) {
        case UPDATE_INVOICE_FILTERS:
            return updateObj(state, action.fieldName, action.searchTerm);
        default:
            return state;
    }
}
