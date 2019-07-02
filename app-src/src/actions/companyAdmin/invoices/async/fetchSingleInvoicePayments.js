import axios from 'axios';

import { API_URL } from 'config';
import {
    FETCH_SINGLE_INVOICE_PAYMENTS_REQUEST,
    FETCH_SINGLE_INVOICE_PAYMENTS_SUCCESS,
    FETCH_SINGLE_INVOICE_PAYMENTS_FAILURE
} from 'constants/actionTypes/invoices';
import { getHeaders } from 'helpers/api';

export const fetchSingleInvoicePaymentsRequest = () => ({
    type: FETCH_SINGLE_INVOICE_PAYMENTS_REQUEST
});

export const fetchSingleInvoicePaymentsSuccess = payload => ({
    type: FETCH_SINGLE_INVOICE_PAYMENTS_SUCCESS,
    payload
});

export const fetchSingleInvoicePaymentsFailure = error => ({
    type: FETCH_SINGLE_INVOICE_PAYMENTS_FAILURE,
    error
});

export default id => dispatch => {
    dispatch(fetchSingleInvoicePaymentsRequest());

    return axios
        .get(`${API_URL}/invoices/${id}/payments`, getHeaders())
        .then(({ data }) => dispatch(fetchSingleInvoicePaymentsSuccess(data)))
        .catch(err => dispatch(fetchSingleInvoicePaymentsFailure(err.message)));
};
