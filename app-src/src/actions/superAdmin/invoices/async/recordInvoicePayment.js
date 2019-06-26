import axios from 'axios';

import {
    SA_RECORD_INVOICE_PAYMENT_REQUEST,
    SA_RECORD_INVOICE_PAYMENT_SUCCESS,
    SA_RECORD_INVOICE_PAYMENT_FAILURE
} from 'constants/actionTypes/superAdminInvoices';
import { ADMIN_API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import setAPIFieldErrors from 'actions/shared/generic/fieldErrors/sync/setAPIFieldErrors';

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

    return axios
        .post(
            `${ADMIN_API_URL}/invoices/${id}/payments/new`,
            postBody,
            getHeaders()
        )
        .then(({ data }) => dispatch(saRecordInvoicePaymentSuccess(data)))
        .catch(error => {
            dispatch(saRecordInvoicePaymentFailure(error.message));
            if (error.response.status === 400)
                dispatch(setAPIFieldErrors(error.response.data));
        });
};
