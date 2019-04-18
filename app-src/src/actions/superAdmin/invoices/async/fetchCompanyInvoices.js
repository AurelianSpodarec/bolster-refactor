import axios from 'axios';

import {
    ADMIN_FETCH_COMPANY_INVOICES_REQUEST,
    ADMIN_FETCH_COMPANY_INVOICES_SUCCESS,
    ADMIN_FETCH_COMPANY_INVOICES_FAILURE
} from 'constants/actionTypes/invoices';
import { ADMIN_API_URL } from 'config';
import { getHeaders } from 'helpers/api';

export const fetchAllCompaniesRequest = () => ({
    type: ADMIN_FETCH_COMPANY_INVOICES_REQUEST
});

export const fetchAllCompaniesSuccess = payload => ({
    type: ADMIN_FETCH_COMPANY_INVOICES_SUCCESS,
    payload
});

export const fetchAllCompaniesFailure = error => ({
    type: ADMIN_FETCH_COMPANY_INVOICES_FAILURE,
    error
});

export default companyID => dispatch => {
    dispatch(fetchAllCompaniesRequest());

    axios
        .get(`${ADMIN_API_URL}/companies/${companyID}/invoices`, getHeaders())
        .then(res => dispatch(fetchAllCompaniesSuccess(res.data)))
        .catch(err => dispatch(fetchAllCompaniesFailure(err.message)));
};
