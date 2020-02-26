import axios from 'axios';

import {
    SA_FETCH_INVOICES_COUNT_FAILURE,
    SA_FETCH_INVOICES_COUNT_SUCCESS,
    SA_FETCH_INVOICES_COUNT_REQUEST,
} from 'constants/actionTypes/superAdminInvoices';
import { ADMIN_API_URL } from 'config';
import { getHeaders } from 'helpers/api';

export const fetchCompanyInvoicesCountRequest = () => ({
    type: SA_FETCH_INVOICES_COUNT_REQUEST,
});

export const fetchCompanyInvoicesCountSuccess = payload => ({
    type: SA_FETCH_INVOICES_COUNT_SUCCESS,
    payload,
});

export const fetchCompanyInvoicesCountFailure = error => ({
    type: SA_FETCH_INVOICES_COUNT_FAILURE,
    error,
});

export default () => dispatch => {
    dispatch(fetchCompanyInvoicesCountRequest());

    return axios
        .get(`${ADMIN_API_URL}/invoices/count`, getHeaders())
        .then(({ data }) => dispatch(fetchCompanyInvoicesCountSuccess(data)))
        .catch(err => dispatch(fetchCompanyInvoicesCountFailure(err.message)));
};
