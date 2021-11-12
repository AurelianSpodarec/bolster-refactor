import axios from 'axios';

import {
    REQUEST_DELETE_INVOICE_REQUEST,
    REQUEST_DELETE_INVOICE_SUCCESS,
    REQUEST_DELETE_INVOICE_FAILURE,
} from 'constants/actionTypes/invoices';
import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';

export const requestDeleteInvoiceRequest = () => ({
    type: REQUEST_DELETE_INVOICE_REQUEST,
});

export const requestDeleteInvoiceSuccess = id => ({
    type: REQUEST_DELETE_INVOICE_SUCCESS,
    id,
});

export const requestDeleteInvoiceFailure = error => ({
    type: REQUEST_DELETE_INVOICE_FAILURE,
    error,
});

export default id => dispatch => {
    dispatch(requestDeleteInvoiceRequest());

    //! check the endpoint
    return axios
        .post(`${API_URL}/invoices/${id}/cancel`, {}, getHeaders())
        .then(() => dispatch(requestDeleteInvoiceSuccess(id)))
        .catch(err => dispatch(requestDeleteInvoiceFailure(err.message)));
};
