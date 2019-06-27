import axios from 'axios';

import {
    SA_EDIT_INVOICE_PAYMENT_REQUEST,
    SA_EDIT_INVOICE_PAYMENT_SUCCESS,
    SA_EDIT_INVOICE_PAYMENT_FAILURE
} from 'constants/actionTypes/superAdminInvoices';
import { ADMIN_API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import setAPIFieldErrors from 'actions/shared/generic/fieldErrors/sync/setAPIFieldErrors';

export const saEditInvoicePaymentRequest = () => ({
    type: SA_EDIT_INVOICE_PAYMENT_REQUEST
});

export const saEditInvoicePaymentSuccess = payload => ({
    type: SA_EDIT_INVOICE_PAYMENT_SUCCESS,
    payload
});

export const saEditInvoicePaymentFailure = error => ({
    type: SA_EDIT_INVOICE_PAYMENT_FAILURE,
    error
});

export default (id, invoiceID, postBody) => dispatch => {
    dispatch(saEditInvoicePaymentRequest());

    //! check the endpoint
    return axios
        .post(
            `${ADMIN_API_URL}/invoices/${invoiceID}/payments/edit/${id}`,
            postBody,
            getHeaders()
        )
        .then(({ data }) => dispatch(saEditInvoicePaymentSuccess(data)))
        .catch(error => {
            dispatch(saEditInvoicePaymentFailure(error.message));
            if (error.response.status === 400)
                // ! the below has a different structure from other error handling but is correct
                dispatch(setAPIFieldErrors(error.response.data));
        });
};
