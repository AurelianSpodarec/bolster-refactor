import axios from 'axios';

import {
    FETCH_SINGLE_COMPANY_FOR_INVOICE_REQUEST,
    FETCH_SINGLE_COMPANY_FOR_INVOICE_SUCCESS,
    FETCH_SINGLE_COMPANY_FOR_INVOICE_FAILURE,
} from 'constants/actionTypes/companiesWithPermissions';
import { getHeaders } from 'helpers/api';
import { ADMIN_API_URL } from 'config';

export const fetchSingleCompanyForInvoiceRequest = () => ({
    type: FETCH_SINGLE_COMPANY_FOR_INVOICE_REQUEST,
});

export const fetchSingleCompanyForInvoiceSuccess = payload => ({
    type: FETCH_SINGLE_COMPANY_FOR_INVOICE_SUCCESS,
    payload,
});

export const fetchSingleCompanyForInvoiceFailure = error => ({
    type: FETCH_SINGLE_COMPANY_FOR_INVOICE_FAILURE,
    error,
});

export default id => dispatch => {
    dispatch(fetchSingleCompanyForInvoiceRequest());

    return axios
        .get(`${ADMIN_API_URL}/companies/${id}`, getHeaders())
        .then(res => dispatch(fetchSingleCompanyForInvoiceSuccess(res.data)))
        .catch(err => dispatch(fetchSingleCompanyForInvoiceFailure(err.message)));
};
