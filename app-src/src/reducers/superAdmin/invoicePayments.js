import { combineReducers } from 'redux';

import { convertArrToObj, updateObj, removeObjItem } from 'helpers/generic';
import {
    SA_EDIT_INVOICE_PAYMENT_REQUEST,
    SA_EDIT_INVOICE_PAYMENT_SUCCESS,
    SA_EDIT_INVOICE_PAYMENT_FAILURE,
    SA_DELETE_INVOICE_PAYMENT_REQUEST,
    SA_DELETE_INVOICE_PAYMENT_SUCCESS,
    SA_DELETE_INVOICE_PAYMENT_FAILURE,
    SA_RECORD_INVOICE_PAYMENT_REQUEST,
    SA_RECORD_INVOICE_PAYMENT_SUCCESS,
    SA_RECORD_INVOICE_PAYMENT_FAILURE,
    SA_FETCH_PAYMENTS_BY_INVOICE_REQUEST,
    SA_FETCH_PAYMENTS_BY_INVOICE_SUCCESS,
    SA_FETCH_PAYMENTS_BY_INVOICE_FAILURE
} from 'constants/actionTypes/superAdminInvoices';

export default combineReducers({
    invoicePayments: invoicePaymentsReducer,
    isFetching: isFetchingReducer,
    error: errorReducer,
    postSuccess: postSuccessReducer
});

function isFetchingReducer(state = false, action) {
    switch (action.type) {
        case SA_FETCH_PAYMENTS_BY_INVOICE_REQUEST:
            return true;
        case SA_FETCH_PAYMENTS_BY_INVOICE_SUCCESS:
        case SA_FETCH_PAYMENTS_BY_INVOICE_FAILURE:
            return false;
        default:
            return state;
    }
}

function errorReducer(state = null, action) {
    switch (action.type) {
        case SA_FETCH_PAYMENTS_BY_INVOICE_REQUEST:
        case SA_DELETE_INVOICE_PAYMENT_REQUEST:
        case SA_EDIT_INVOICE_PAYMENT_REQUEST:
        case SA_RECORD_INVOICE_PAYMENT_REQUEST:
            return null;
        case SA_FETCH_PAYMENTS_BY_INVOICE_FAILURE:
        case SA_DELETE_INVOICE_PAYMENT_FAILURE:
        case SA_EDIT_INVOICE_PAYMENT_FAILURE:
        case SA_RECORD_INVOICE_PAYMENT_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function postSuccessReducer(state = false, action) {
    switch (action.type) {
        case SA_DELETE_INVOICE_PAYMENT_REQUEST:
        case SA_EDIT_INVOICE_PAYMENT_REQUEST:
        case SA_RECORD_INVOICE_PAYMENT_REQUEST:
            return false;
        case SA_DELETE_INVOICE_PAYMENT_SUCCESS:
        case SA_EDIT_INVOICE_PAYMENT_SUCCESS:
        case SA_RECORD_INVOICE_PAYMENT_SUCCESS:
            return true;
        default:
            return state;
    }
}

function invoicePaymentsReducer(state = {}, action) {
    switch (action.type) {
        case SA_FETCH_PAYMENTS_BY_INVOICE_SUCCESS:
            return convertArrToObj(action.payload);
        case SA_EDIT_INVOICE_PAYMENT_SUCCESS:
        case SA_RECORD_INVOICE_PAYMENT_SUCCESS:
            return updateObj(state, action.payload.id, action.payload);
        case SA_DELETE_INVOICE_PAYMENT_SUCCESS:
            return removeObjItem(state, action.payload.id);
        default:
            return state;
    }
}
