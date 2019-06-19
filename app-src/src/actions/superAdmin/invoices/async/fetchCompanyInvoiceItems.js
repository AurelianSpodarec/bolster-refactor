import axios from 'axios';

import {
    ADMIN_FETCH_COMPANY_INVOICE_ITEMS_REQUEST,
    ADMIN_FETCH_COMPANY_INVOICE_ITEMS_SUCCESS,
    ADMIN_FETCH_COMPANY_INVOICE_ITEMS_FAILURE
} from 'constants/actionTypes/invoices';
import { ADMIN_API_URL } from 'config';
import { getHeaders } from 'helpers/api';

export const fetchCompanyInvoiceItemsRequest = () => ({
    type: ADMIN_FETCH_COMPANY_INVOICE_ITEMS_REQUEST
});

export const fetchCompanyInvoiceItemsSuccess = payload => ({
    type: ADMIN_FETCH_COMPANY_INVOICE_ITEMS_SUCCESS,
    payload
});

export const fetchCompanyInvoiceItemsFailure = error => ({
    type: ADMIN_FETCH_COMPANY_INVOICE_ITEMS_FAILURE,
    error
});

export default companyID => dispatch => {
    dispatch(fetchCompanyInvoiceItemsRequest());

    return axios
        .get(
            `${ADMIN_API_URL}/companies/${companyID}/invoiceItems`,
            getHeaders()
        )
        .then(res => dispatch(fetchCompanyInvoiceItemsSuccess(res.data)))
        .catch(err => dispatch(fetchCompanyInvoiceItemsFailure(err.message)));
};
