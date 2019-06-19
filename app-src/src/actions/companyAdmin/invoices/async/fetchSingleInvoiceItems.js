import axios from 'axios';

import { API_URL } from 'config';
import {
    FETCH_SINGLE_INVOICE_ITEMS_REQUEST,
    FETCH_SINGLE_INVOICE_ITEMS_SUCCESS,
    FETCH_SINGLE_INVOICE_ITEMS_FAILURE
} from 'constants/actionTypes/invoices';
import { getHeaders } from 'helpers/api';

export const fetchSingleInvoiceItemsRequest = () => ({
    type: FETCH_SINGLE_INVOICE_ITEMS_REQUEST
});

export const fetchSingleInvoiceItemsSuccess = payload => ({
    type: FETCH_SINGLE_INVOICE_ITEMS_SUCCESS,
    payload
});

export const fetchSingleInvoiceItemsFailure = error => ({
    type: FETCH_SINGLE_INVOICE_ITEMS_FAILURE,
    error
});

export default id => dispatch => {
    dispatch(fetchSingleInvoiceItemsRequest());

    return axios
        .get(`${API_URL}/invoices/${id}/items`, getHeaders())
        .then(res => dispatch(fetchSingleInvoiceItemsSuccess(res.data)))
        .catch(err => dispatch(fetchSingleInvoiceItemsFailure(err.message)));
};
