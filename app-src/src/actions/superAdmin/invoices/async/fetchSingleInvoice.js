import axios from 'axios';

import {
    SA_FETCH_SINGLE_INVOICE_REQUEST,
    SA_FETCH_SINGLE_INVOICE_SUCCESS,
    SA_FETCH_SINGLE_INVOICE_FAILURE,
} from 'constants/actionTypes/superAdminInvoices';
import { ADMIN_API_URL } from 'config';
import { getHeaders } from 'helpers/api';

export const fetchSingleInvoiceRequest = () => ({
    type: SA_FETCH_SINGLE_INVOICE_REQUEST,
});

export const fetchSingleInvoiceSuccess = payload => ({
    type: SA_FETCH_SINGLE_INVOICE_SUCCESS,
    payload,
});

export const fetchSingleInvoiceFailure = error => ({
    type: SA_FETCH_SINGLE_INVOICE_FAILURE,
    error,
});

export default invoiceID => async dispatch => {
    dispatch(fetchSingleInvoiceRequest());

    return axios
        .get(`${ADMIN_API_URL}/invoices/${invoiceID}`, getHeaders())
        .then(res => dispatch(fetchSingleInvoiceSuccess(res.data)))
        .catch(err => dispatch(fetchSingleInvoiceFailure(err.message)));
};
