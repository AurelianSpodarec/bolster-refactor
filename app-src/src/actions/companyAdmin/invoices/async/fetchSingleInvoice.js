import axios from 'axios';

import { API_URL } from 'config';
import {
    FETCH_SINGLE_INVOICE_REQUEST,
    FETCH_SINGLE_INVOICE_SUCCESS,
    FETCH_SINGLE_INVOICE_FAILURE
} from 'constants/actionTypes/invoices';
import { getHeaders } from 'helpers/api';

export const fetchSingleInvoiceRequest = () => ({
    type: FETCH_SINGLE_INVOICE_REQUEST
});

export const fetchSingleInvoiceSuccess = payload => ({
    type: FETCH_SINGLE_INVOICE_SUCCESS,
    payload
});

export const fetchSingleInvoiceFailure = error => ({
    type: FETCH_SINGLE_INVOICE_FAILURE,
    error
});

export default id => dispatch => {
    dispatch(fetchSingleInvoiceRequest());

    return axios
        .get(`${API_URL}/invoices/${id}`, getHeaders())
        .then(res => dispatch(fetchSingleInvoiceSuccess(res.data)))
        .catch(err => dispatch(fetchSingleInvoiceFailure(err.message)));
};
