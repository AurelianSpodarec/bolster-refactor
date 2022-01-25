import axios from 'axios';

import {
    SA_RESTORE_INVOICE_REQUEST,
    SA_RESTORE_INVOICE_SUCCESS,
    SA_RESTORE_INVOICE_FAILURE,
} from 'constants/actionTypes/superAdminInvoices';
import { ADMIN_API_URL } from 'config';
import { getHeaders } from 'helpers/api';

export const saRestoreInvoiceRequest = () => ({
    type: SA_RESTORE_INVOICE_REQUEST,
});

export const saRestoreInvoiceSuccess = invoice => ({
    type: SA_RESTORE_INVOICE_SUCCESS,
    invoice,
});

export const saRestoreInvoiceFailure = error => ({
    type: SA_RESTORE_INVOICE_FAILURE,
    error,
});

export default id => dispatch => {
    dispatch(saRestoreInvoiceRequest());

    return axios
        .post(`${ADMIN_API_URL}/invoices/${id}/restore`, null, getHeaders())
        .then(({ data }) => dispatch(saRestoreInvoiceSuccess(data)))
        .catch(err => dispatch(saRestoreInvoiceFailure(err.message)));
};
