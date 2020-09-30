import axios from 'axios';

import { ADMIN_API_URL } from 'config';
import {
    ADD_INVOICE_COMMENT_FAILURE,
    ADD_INVOICE_COMMENT_REQUEST,
    ADD_INVOICE_COMMENT_SUCCESS,
} from 'constants/actionTypes/superAdminInvoices';
import { getHeaders } from 'helpers/api';

export const addInvoiceCommentRequest = () => ({
    type: ADD_INVOICE_COMMENT_REQUEST,
});

export const addInvoiceCommentSuccess = data => ({
    type: ADD_INVOICE_COMMENT_SUCCESS,
    data,
});

export const addInvoiceCommentFailure = error => ({
    type: ADD_INVOICE_COMMENT_FAILURE,
    error,
});

export default (invoiceID, comment) => dispatch => {
    dispatch(addInvoiceCommentRequest());
    return axios
        .put(`${ADMIN_API_URL}/invoices/${invoiceID}`, { Comment: comment }, getHeaders())
        .then(({ data }) => dispatch(addInvoiceCommentSuccess(data)))
        .catch(err => dispatch(addInvoiceCommentFailure(err.message)));
};
