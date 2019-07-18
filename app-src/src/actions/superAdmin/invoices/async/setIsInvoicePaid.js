import axios from 'axios';

import {
    SA_SET_IS_INVOICE_PAID_REQUEST,
    SA_SET_IS_INVOICE_PAID_SUCCESS,
    SA_SET_IS_INVOICE_PAID_FAILURE
} from 'constants/actionTypes/superAdminInvoices';
import { ADMIN_API_URL } from 'config';
import { getHeaders } from 'helpers/api';

export const saSetIsInvoicePaidRequest = () => ({
    type: SA_SET_IS_INVOICE_PAID_REQUEST
});

export const saSetIsInvoicePaidSuccess = payload => ({
    type: SA_SET_IS_INVOICE_PAID_SUCCESS,
    payload
});

export const saSetIsInvoicePaidFailure = error => ({
    type: SA_SET_IS_INVOICE_PAID_FAILURE,
    error
});

export default (id, bool) => dispatch => {
    dispatch(saSetIsInvoicePaidRequest());

    return axios
        .post(
            `${ADMIN_API_URL}/invoices/${id}/setIsPaid?isPaid=${bool}`,
            {},
            getHeaders()
        )
        .then(({ data }) => dispatch(saSetIsInvoicePaidSuccess(data)))
        .catch(err => dispatch(saSetIsInvoicePaidFailure(err.message)));
};
