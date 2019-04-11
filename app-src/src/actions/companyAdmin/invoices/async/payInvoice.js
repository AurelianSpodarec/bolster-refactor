import axios from 'axios';

import { API_URL } from 'config';
import {
    PAY_INVOICE_REQUEST,
    PAY_INVOICE_SUCCESS,
    PAY_INVOICE_FAILURE
} from 'constants/actionTypes/invoices';
import { getHeaders } from 'helpers/api';

export const payInvoiceRequest = () => ({
    type: PAY_INVOICE_REQUEST
});

export const payInvoiceSuccess = payload => ({
    type: PAY_INVOICE_SUCCESS,
    payload
});

export const payInvoiceFailure = error => ({
    type: PAY_INVOICE_FAILURE,
    error
});

export default (invoiceID, stripeCardID) => dispatch => {
    dispatch(payInvoiceRequest());

    return axios
        .post(
            `${API_URL}/invoices/${invoiceID}/pay`,
            { invoiceID, stripeCardID },
            getHeaders()
        )
        .then(({ data }) => dispatch(payInvoiceSuccess(data)))
        .catch(err => dispatch(payInvoiceFailure(err.message)));
};
