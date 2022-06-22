import axios from 'axios';

import { API_URL } from 'config';
import { getHeaders, handleErrors } from 'helpers/api';
import {
    POST_COMPANY_PAY_RATES_REQUEST,
    POST_COMPANY_PAY_RATES_SUCCESS,
    POST_COMPANY_PAY_RATES_FAILURE,
} from 'constants/actionTypes/payRates';

export const postCompanyPayRatesRequest = () => ({
    type: POST_COMPANY_PAY_RATES_REQUEST,
});

export const postCompanyPayRatesSuccess = payload => ({
    type: POST_COMPANY_PAY_RATES_SUCCESS,
    payload,
});

export const postCompanyPayRatesFailure = error => ({
    type: POST_COMPANY_PAY_RATES_FAILURE,
    error,
});

export default postBody => dispatch => {
    dispatch(postCompanyPayRatesRequest());

    return axios
        .post(`${API_URL}/payRates`, postBody, getHeaders())
        .then(({ data }) => dispatch(postCompanyPayRatesSuccess(data)))
        .catch(err => dispatch(handleErrors(postCompanyPayRatesFailure)(err)));
};
