import axios from 'axios';

import {
    SA_FETCH_ALL_INVOICES_FAILURE,
    SA_FETCH_ALL_INVOICES_SUCCESS,
    SA_FETCH_ALL_INVOICES_REQUEST
} from 'constants/actionTypes/superAdminInvoices';
import { ADMIN_API_URL } from 'config';
import { getHeaders } from 'helpers/api';

export const fetchCompanyInvoicesRequest = () => ({
    type: SA_FETCH_ALL_INVOICES_REQUEST
});

export const fetchCompanyInvoicesSuccess = payload => ({
    type: SA_FETCH_ALL_INVOICES_SUCCESS,
    payload
});

export const fetchCompanyInvoicesFailure = error => ({
    type: SA_FETCH_ALL_INVOICES_FAILURE,
    error
});

export default () => dispatch => {
    dispatch(fetchCompanyInvoicesRequest());

    axios
        .get(`${ADMIN_API_URL}/invoices`, getHeaders())
        .then(({ data }) => dispatch(fetchCompanyInvoicesSuccess(data)))
        .catch(err => dispatch(fetchCompanyInvoicesFailure(err.message)));
};
