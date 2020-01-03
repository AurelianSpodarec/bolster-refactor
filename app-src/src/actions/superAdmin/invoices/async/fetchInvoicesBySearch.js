import axios from 'axios';

import {
    SA_FETCH_INVOICES_BY_SEARCH_FAILURE,
    SA_FETCH_INVOICES_BY_SEARCH_SUCCESS,
    SA_FETCH_INVOICES_BY_SEARCH_REQUEST,
} from 'constants/actionTypes/superAdminInvoices';
import { ADMIN_API_URL } from 'config';
import { getHeaders } from 'helpers/api';

export const fetchCompanyInvoicesBySearchRequest = () => ({
    type: SA_FETCH_INVOICES_BY_SEARCH_REQUEST,
});

export const fetchCompanyInvoicesBySearchSuccess = (payload, page) => ({
    type: SA_FETCH_INVOICES_BY_SEARCH_SUCCESS,
    payload,
    page,
});

export const fetchCompanyInvoicesBySearchFailure = error => ({
    type: SA_FETCH_INVOICES_BY_SEARCH_FAILURE,
    error,
});

export default (page = 1, searchTerm, limit = 50) => dispatch => {
    dispatch(fetchCompanyInvoicesBySearchRequest());
    const route = '/invoices/search';
    let queries = `?page=${page}&limit=${limit}`;
    if (searchTerm) queries += `&searchTerm=${searchTerm}`;
    return axios
        .get(`${ADMIN_API_URL}${route}${queries}`, getHeaders())
        .then(({ data }) => dispatch(fetchCompanyInvoicesBySearchSuccess(data, page)))
        .catch(err => dispatch(fetchCompanyInvoicesBySearchFailure(err.message)));
};
