import axios from 'axios';

import { API_URL } from 'config';
import {
    FETCH_ALL_INVOICE_ITEMS_REQUEST,
    FETCH_ALL_INVOICE_ITEMS_SUCCESS,
    FETCH_ALL_INVOICE_ITEMS_FAILURE
} from 'constants/actionTypes/invoices';
import { getHeaders } from 'helpers/api';

export const fetchInvoiceItemsRequest = () => ({
    type: FETCH_ALL_INVOICE_ITEMS_REQUEST
});

export const fetchInvoiceItemsSuccess = payload => ({
    type: FETCH_ALL_INVOICE_ITEMS_SUCCESS,
    payload
});

export const fetchInvoiceItemsFailure = error => ({
    type: FETCH_ALL_INVOICE_ITEMS_FAILURE,
    error
});

export default () => dispatch => {
    dispatch(fetchInvoiceItemsRequest());

    axios
        .get(`${API_URL}/invoices/items`, getHeaders())
        .then(res => dispatch(fetchInvoiceItemsSuccess(res.data)))
        .catch(err => dispatch(fetchInvoiceItemsFailure(err.message)));
};
