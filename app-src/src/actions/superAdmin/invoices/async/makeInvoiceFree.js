import axios from 'axios';

import {
    SA_MAKE_INVOICE_FREE_REQUEST,
    SA_MAKE_INVOICE_FREE_SUCCESS,
    SA_MAKE_INVOICE_FREE_FAILURE
} from 'constants/actionTypes/superAdminInvoices';
import { ADMIN_API_URL } from 'config';
import { getHeaders } from 'helpers/api';

export const saMakeInvoiceFreeRequest = () => ({
    type: SA_MAKE_INVOICE_FREE_REQUEST
});

export const saMakeInvoiceFreeSuccess = payload => ({
    type: SA_MAKE_INVOICE_FREE_SUCCESS,
    payload
});

export const saMakeInvoiceFreeFailure = error => ({
    type: SA_MAKE_INVOICE_FREE_FAILURE,
    error
});

export default id => dispatch => {
    dispatch(saMakeInvoiceFreeRequest());

    // ! change the end point
    return axios
        .post(`${ADMIN_API_URL}/invoices/${id}/makefree`, {}, getHeaders())
        .then(({ data }) => dispatch(saMakeInvoiceFreeSuccess(data)))
        .catch(err => dispatch(saMakeInvoiceFreeFailure(err.message)));
};
