import axios from 'axios';

import { API_URL } from 'config';
import { getHeaders, handleErrors } from 'helpers/api';
import {
    FETCH_PAY_RATES_REQUEST,
    FETCH_PAY_RATES_SUCCESS,
    FETCH_PAY_RATES_FAILURE,
} from 'constants/actionTypes/payRates';

export const fetchPayRatesRequest = () => ({
    type: FETCH_PAY_RATES_REQUEST,
});

export const fetchPayRatesSuccess = payload => ({
    type: FETCH_PAY_RATES_SUCCESS,
    payload,
});

export const fetchPayRatesFailure = error => ({
    type: FETCH_PAY_RATES_FAILURE,
    error,
});

export default () => dispatch => {
    dispatch(fetchPayRatesRequest());

    return axios
        .get(`${API_URL}/payRates`, getHeaders())
        .then(({ data }) => dispatch(fetchPayRatesSuccess(data)))
        .catch(err => dispatch(handleErrors(fetchPayRatesFailure)(err)));
};
