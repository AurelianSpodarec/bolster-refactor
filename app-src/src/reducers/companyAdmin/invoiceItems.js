import { combineReducers } from 'redux';

import {
    FETCH_ALL_INVOICE_ITEMS_REQUEST,
    FETCH_ALL_INVOICE_ITEMS_SUCCESS,
    FETCH_ALL_INVOICE_ITEMS_FAILURE
} from 'constants/actionTypes/invoices';
import { convertArrToObj } from 'helpers/generic';

export default combineReducers({
    isFetching: isFetchingReducer,
    invoiceItems: invoiceItemsReducer,
    error: errorReducer
});

function isFetchingReducer(state = false, action) {
    switch (action.type) {
        case FETCH_ALL_INVOICE_ITEMS_REQUEST:
            return true;
        case FETCH_ALL_INVOICE_ITEMS_SUCCESS:
        case FETCH_ALL_INVOICE_ITEMS_FAILURE:
            return false;
        default:
            return state;
    }
}

function errorReducer(state = null, action) {
    switch (action.type) {
        case FETCH_ALL_INVOICE_ITEMS_REQUEST:
            return null;
        case FETCH_ALL_INVOICE_ITEMS_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function invoiceItemsReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_ALL_INVOICE_ITEMS_SUCCESS:
            return convertArrToObj(action.payload);
        default:
            return state;
    }
}
