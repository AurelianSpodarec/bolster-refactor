import axios from 'axios';

import { ADMIN_API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import {
    FETCH_ADMIN_PIN_OPTIONS_FOR_COMPANY_REQUEST,
    FETCH_ADMIN_PIN_OPTIONS_FOR_COMPANY_SUCCESS,
    FETCH_ADMIN_PIN_OPTIONS_FOR_COMPANY_FAILURE,
} from 'constants/actionTypes/pinOptions';

export const fetchPinOptionsForCompanyRequest = () => ({
    type: FETCH_ADMIN_PIN_OPTIONS_FOR_COMPANY_REQUEST,
});

export const fetchPinOptionsForCompanySuccess = payload => ({
    type: FETCH_ADMIN_PIN_OPTIONS_FOR_COMPANY_SUCCESS,
    payload,
});

export const fetchPinOptionsForCompanyFailure = error => ({
    type: FETCH_ADMIN_PIN_OPTIONS_FOR_COMPANY_FAILURE,
    error,
});

export default companyID => async dispatch => {
    dispatch(fetchPinOptionsForCompanyRequest());

    return axios
        .get(`${ADMIN_API_URL}/pinoptions/options/company/${companyID}`, getHeaders())
        .then(res => dispatch(fetchPinOptionsForCompanySuccess(res.data)))
        .catch(err => dispatch(fetchPinOptionsForCompanyFailure(err.message)));
};
