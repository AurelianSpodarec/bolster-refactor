import axios from 'axios';

import { API_URL } from 'config';
import { getHeaders, handleErrors } from 'helpers/api';
import {
    POST_ASSIGN_PAY_RATES_REQUEST,
    POST_ASSIGN_PAY_RATES_SUCCESS,
    POST_ASSIGN_PAY_RATES_FAILURE,
} from 'constants/actionTypes/payRates';

export const postAssignPayRatesRequest = () => ({
    type: POST_ASSIGN_PAY_RATES_REQUEST,
});

export const postAssignPayRatesSuccess = payload => ({
    type: POST_ASSIGN_PAY_RATES_SUCCESS,
    payload,
});

export const postAssignPayRatesFailure = error => ({
    type: POST_ASSIGN_PAY_RATES_FAILURE,
    error,
});

export default postBody => dispatch => {
    dispatch(postAssignPayRatesRequest());

    return axios
        .post(`${API_URL}/payRates/assign`, postBody, getHeaders())
        .then(({ data }) => dispatch(postAssignPayRatesSuccess(data)))
        .catch(err => dispatch(handleErrors(postAssignPayRatesFailure)(err)));
};
