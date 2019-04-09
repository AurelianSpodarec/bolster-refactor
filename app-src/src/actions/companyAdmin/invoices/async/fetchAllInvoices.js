import axios from 'axios';

import { API_URL } from 'config';
import {
    FETCH_ALL_INVOICES_REQUEST,
    FETCH_ALL_INVOICES_SUCCESS,
    FETCH_ALL_INVOICES_FAILURE
} from 'constants/actionTypes/invoices';
import { getHeaders } from 'helpers/api';

export const fetchInvoicesRequest = () => ({
    type: FETCH_ALL_INVOICES_REQUEST
});

export const fetchInvoicesSuccess = payload => ({
    type: FETCH_ALL_INVOICES_SUCCESS,
    payload
});

export const fetchInvoicesFailure = error => ({
    type: FETCH_ALL_INVOICES_FAILURE,
    error
});

export default () => dispatch => {
    dispatch(fetchInvoicesRequest());

    axios
        .get(`${API_URL}/invoices`, getHeaders())
        .then(res => dispatch(fetchInvoicesSuccess(res.data)))
        .catch(err => dispatch(fetchInvoicesFailure(err.message)));
};
