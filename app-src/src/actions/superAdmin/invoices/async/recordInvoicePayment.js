import axios from 'axios';

import {
    SA_RECORD_INVOICE_PAYMENT_REQUEST,
    SA_RECORD_INVOICE_PAYMENT_SUCCESS,
    SA_RECORD_INVOICE_PAYMENT_FAILURE
} from 'constants/actionTypes/superAdminInvoices';
import { ADMIN_API_URL } from 'config';
import { getHeaders } from 'helpers/api';

export const saRecordInvoicePaymentRequest = () => ({
    type: SA_RECORD_INVOICE_PAYMENT_REQUEST
});

export const saRecordInvoicePaymentSuccess = payload => ({
    type: SA_RECORD_INVOICE_PAYMENT_SUCCESS,
    payload
});

export const saRecordInvoicePaymentFailure = error => ({
    type: SA_RECORD_INVOICE_PAYMENT_FAILURE,
    error
});

export default (id, postBody) => dispatch => {
    dispatch(saRecordInvoicePaymentRequest());

    //! check the endpoint
    return axios
        .post(
            `${ADMIN_API_URL}/invoices/payments/${id}`,
            postBody,
            getHeaders()
        )
        .then(({ data }) => dispatch(saRecordInvoicePaymentSuccess(data)))
        .catch(err => dispatch(saRecordInvoicePaymentFailure(err.message)));
};
