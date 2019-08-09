import axios from 'axios';

import {
    DELETE_INVOICE_REQUEST,
    DELETE_INVOICE_SUCCESS,
    DELETE_INVOICE_FAILURE
} from 'constants/actionTypes/invoices';
import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';

export const deleteInvoiceRequest = () => ({
    type: DELETE_INVOICE_REQUEST
});

export const deleteInvoiceSuccess = id => ({
    type: DELETE_INVOICE_SUCCESS,
    id
});

export const deleteInvoiceFailure = error => ({
    type: DELETE_INVOICE_FAILURE,
    error
});

export default id => dispatch => {
    dispatch(deleteInvoiceRequest());

    //! check the endpoint
    return axios
        .post(`${API_URL}/invoices/${id}/cancel`, {}, getHeaders())
        .then(() => dispatch(deleteInvoiceSuccess(id)))
        .catch(err => dispatch(deleteInvoiceFailure(err.message)));
};
