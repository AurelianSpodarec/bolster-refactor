import axios from 'axios';

import {
    SA_FETCH_INVOICES_BY_PAGE_FAILURE,
    SA_FETCH_INVOICES_BY_PAGE_SUCCESS,
    SA_FETCH_INVOICES_BY_PAGE_REQUEST,
} from 'constants/actionTypes/superAdminInvoices';
import { ADMIN_API_URL } from 'config';
import { getHeaders } from 'helpers/api';

export const fetchCompanyInvoicesByPageRequest = () => ({
    type: SA_FETCH_INVOICES_BY_PAGE_REQUEST,
});

export const fetchCompanyInvoicesByPageSuccess = payload => ({
    type: SA_FETCH_INVOICES_BY_PAGE_SUCCESS,
    payload,
});

export const fetchCompanyInvoicesByPageFailure = error => ({
    type: SA_FETCH_INVOICES_BY_PAGE_FAILURE,
    error,
});

export default (page = 1, searchTerm, limit) => dispatch => {
    dispatch(fetchCompanyInvoicesByPageRequest());

    return axios
        .get(
            `${ADMIN_API_URL}/invoices/search?page=${page}&limit=${limit}&searchTerm=${searchTerm}`,
            getHeaders()
        )
        .then(({ data }) => dispatch(fetchCompanyInvoicesByPageSuccess(data)))
        .catch(err => dispatch(fetchCompanyInvoicesByPageFailure(err.message)));
};
