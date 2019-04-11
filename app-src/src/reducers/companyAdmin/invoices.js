import { combineReducers } from 'redux';

import {
    FETCH_ALL_INVOICES_REQUEST,
    FETCH_ALL_INVOICES_SUCCESS,
    FETCH_ALL_INVOICES_FAILURE,
    FETCH_SINGLE_INVOICE_REQUEST,
    FETCH_SINGLE_INVOICE_SUCCESS,
    FETCH_SINGLE_INVOICE_FAILURE,
    PAY_INVOICE_REQUEST,
    PAY_INVOICE_SUCCESS,
    PAY_INVOICE_FAILURE
} from 'constants/actionTypes/invoices';
import { convertArrToObj, updateObj, removeObjItem } from 'helpers/generic';

export default combineReducers({
    isFetching: isFetchingReducer,
    postSuccess: postSuccessReducer,
    postFailure: postFailureReducer,
    invoices: invoiceReducer,
    error: errorReducer
});

function isFetchingReducer(state = false, action) {
    switch (action.type) {
        case FETCH_ALL_INVOICES_REQUEST:
        case FETCH_SINGLE_INVOICE_REQUEST:
            return true;
        case FETCH_ALL_INVOICES_SUCCESS:
        case FETCH_ALL_INVOICES_FAILURE:
        case FETCH_SINGLE_INVOICE_SUCCESS:
        case FETCH_SINGLE_INVOICE_FAILURE:
            return false;
        default:
            return state;
    }
}

function errorReducer(state = null, action) {
    switch (action.type) {
        case FETCH_ALL_INVOICES_REQUEST:
        case FETCH_SINGLE_INVOICE_REQUEST:
        case PAY_INVOICE_REQUEST:
            return null;
        case FETCH_ALL_INVOICES_FAILURE:
        case FETCH_SINGLE_INVOICE_FAILURE:
        case PAY_INVOICE_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function postSuccessReducer(state = false, action) {
    switch (action.type) {
        case PAY_INVOICE_REQUEST:
            return false;
        case PAY_INVOICE_SUCCESS:
            return true;
        default:
            return state;
    }
}

function postFailureReducer(state = false, action) {
    switch (action.type) {
        case PAY_INVOICE_REQUEST:
            return false;
        case PAY_INVOICE_FAILURE:
            return true;
        default:
            return state;
    }
}

function invoiceReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_ALL_INVOICES_SUCCESS:
            return convertArrToObj(action.payload);
        case FETCH_SINGLE_INVOICE_SUCCESS:
            return updateObj(state, action.payload.id, action.payload);
        case PAY_INVOICE_SUCCESS:
            return removeObjItem(state, action.payload.id);
        default:
            return state;
    }
}
