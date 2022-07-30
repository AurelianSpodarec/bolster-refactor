import axios from 'axios';

import { ADMIN_API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import {
    FETCH_ADMIN_PIN_OPTION_VERSIONS_FOR_COMPANY_REQUEST,
    FETCH_ADMIN_PIN_OPTION_VERSIONS_FOR_COMPANY_SUCCESS,
    FETCH_ADMIN_PIN_OPTION_VERSIONS_FOR_COMPANY_FAILURE,
} from 'constants/actionTypes/pinOptions';

export const fetchPinOptionVersionsForCompanyRequest = () => ({
    type: FETCH_ADMIN_PIN_OPTION_VERSIONS_FOR_COMPANY_REQUEST,
});

export const fetchPinOptionVersionsForCompanySuccess = payload => ({
    type: FETCH_ADMIN_PIN_OPTION_VERSIONS_FOR_COMPANY_SUCCESS,
    payload,
});

export const fetchPinOptionVersionsForCompanyFailure = error => ({
    type: FETCH_ADMIN_PIN_OPTION_VERSIONS_FOR_COMPANY_FAILURE,
    error,
});

export default companyID => async dispatch => {
    dispatch(fetchPinOptionVersionsForCompanyRequest());

    return axios
        .get(`${ADMIN_API_URL}/pinoptions/versions/company/${companyID}`, getHeaders())
        .then(res => dispatch(fetchPinOptionVersionsForCompanySuccess(res.data)))
        .catch(err => dispatch(fetchPinOptionVersionsForCompanyFailure(err.message)));
};
