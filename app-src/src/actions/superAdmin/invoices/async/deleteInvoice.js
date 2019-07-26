import axios from 'axios';

import {
    SA_DELETE_INVOICE_REQUEST,
    SA_DELETE_INVOICE_SUCCESS,
    SA_DELETE_INVOICE_FAILURE
} from 'constants/actionTypes/superAdminInvoices';
import { ADMIN_API_URL } from 'config';
import { getHeaders } from 'helpers/api';

export const saDeleteInvoiceRequest = () => ({
    type: SA_DELETE_INVOICE_REQUEST
});

export const saDeleteInvoiceSuccess = id => ({
    type: SA_DELETE_INVOICE_SUCCESS,
    id
});

export const saDeleteInvoiceFailure = error => ({
    type: SA_DELETE_INVOICE_FAILURE,
    error
});

export default id => dispatch => {
    dispatch(saDeleteInvoiceRequest());

    //! check the endpoint
    return axios
        .delete(`${ADMIN_API_URL}/invoices/${id}/delete`, getHeaders())
        .then(() => dispatch(saDeleteInvoiceSuccess(id)))
        .catch(err => dispatch(saDeleteInvoiceFailure(err.message)));
};
