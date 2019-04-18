import axios from 'axios';

import {
    ADMIN_FETCH_COMPANY_INVOICES_REQUEST,
    ADMIN_FETCH_COMPANY_INVOICES_SUCCESS,
    ADMIN_FETCH_COMPANY_INVOICES_FAILURE
} from 'constants/actionTypes/invoices';
import { ADMIN_API_URL } from 'config';
import { getHeaders } from 'helpers/api';

export const fetchCompanyInvoicesRequest = () => ({
    type: ADMIN_FETCH_COMPANY_INVOICES_REQUEST
});

export const fetchCompanyInvoicesSuccess = payload => ({
    type: ADMIN_FETCH_COMPANY_INVOICES_SUCCESS,
    payload
});

export const fetchCompanyInvoicesFailure = error => ({
    type: ADMIN_FETCH_COMPANY_INVOICES_FAILURE,
    error
});

export default companyID => dispatch => {
    dispatch(fetchCompanyInvoicesRequest());

    axios
        .get(`${ADMIN_API_URL}/companies/${companyID}/invoices`, getHeaders())
        .then(res => dispatch(fetchCompanyInvoicesSuccess(res.data)))
        .catch(err => dispatch(fetchCompanyInvoicesFailure(err.message)));
};
