import axios from 'axios';

import {
    SA_DELETE_INVOICE_PAYMENT_REQUEST,
    SA_DELETE_INVOICE_PAYMENT_SUCCESS,
    SA_DELETE_INVOICE_PAYMENT_FAILURE
} from 'constants/actionTypes/superAdminInvoices';
import { ADMIN_API_URL } from 'config';
import { getHeaders } from 'helpers/api';

export const saDeleteInvoicePaymentRequest = () => ({
    type: SA_DELETE_INVOICE_PAYMENT_REQUEST
});

export const saDeleteInvoicePaymentSuccess = id => ({
    type: SA_DELETE_INVOICE_PAYMENT_SUCCESS,
    id
});

export const saDeleteInvoicePaymentFailure = error => ({
    type: SA_DELETE_INVOICE_PAYMENT_FAILURE,
    error
});

export default id => dispatch => {
    dispatch(saDeleteInvoicePaymentRequest());

    //! check the endpoint
    return axios
        .delete(`${ADMIN_API_URL}/invoices/payments/${id}`, getHeaders())
        .then(() => dispatch(saDeleteInvoicePaymentSuccess(id)))
        .catch(err => dispatch(saDeleteInvoicePaymentFailure(err.message)));
};
