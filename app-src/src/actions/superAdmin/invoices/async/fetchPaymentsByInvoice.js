import axios from 'axios';

import {
    SA_FETCH_PAYMENTS_BY_INVOICE_FAILURE,
    SA_FETCH_PAYMENTS_BY_INVOICE_SUCCESS,
    SA_FETCH_PAYMENTS_BY_INVOICE_REQUEST
} from 'constants/actionTypes/superAdminInvoices';
import { ADMIN_API_URL } from 'config';
import { getHeaders } from 'helpers/api';

export const fetchPaymentsByInvoiceRequest = () => ({
    type: SA_FETCH_PAYMENTS_BY_INVOICE_REQUEST
});

export const fetchPaymentsByInvoiceSuccess = payload => ({
    type: SA_FETCH_PAYMENTS_BY_INVOICE_SUCCESS,
    payload
});

export const fetchPaymentsByInvoiceFailure = error => ({
    type: SA_FETCH_PAYMENTS_BY_INVOICE_FAILURE,
    error
});

export default id => dispatch => {
    dispatch(fetchPaymentsByInvoiceRequest());

    return axios
        .get(`${ADMIN_API_URL}/invoices/${id}/payments`, getHeaders())
        .then(({ data }) => dispatch(fetchPaymentsByInvoiceSuccess(data)))
        .catch(err => dispatch(fetchPaymentsByInvoiceFailure(err.message)));
};
