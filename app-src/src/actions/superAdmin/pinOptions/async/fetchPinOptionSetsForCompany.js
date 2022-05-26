import axios from 'axios';

import { ADMIN_API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import {
    FETCH_ADMIN_PIN_OPTION_SETS_FOR_COMPANY_REQUEST,
    FETCH_ADMIN_PIN_OPTION_SETS_FOR_COMPANY_SUCCESS,
    FETCH_ADMIN_PIN_OPTION_SETS_FOR_COMPANY_FAILURE,
} from 'constants/actionTypes/pinOptions';

export const fetchPinOptionSetsForCompanyRequest = () => ({
    type: FETCH_ADMIN_PIN_OPTION_SETS_FOR_COMPANY_REQUEST,
});

export const fetchPinOptionSetsForCompanySuccess = payload => ({
    type: FETCH_ADMIN_PIN_OPTION_SETS_FOR_COMPANY_SUCCESS,
    payload,
});

export const fetchPinOptionSetsForCompanyFailure = error => ({
    type: FETCH_ADMIN_PIN_OPTION_SETS_FOR_COMPANY_FAILURE,
    error,
});

export default companyID => async dispatch => {
    dispatch(fetchPinOptionSetsForCompanyRequest());

    return axios
        .get(`${ADMIN_API_URL}/pinoptions/sets/company/${companyID}`, getHeaders())
        .then(res => dispatch(fetchPinOptionSetsForCompanySuccess(res.data)))
        .catch(err => dispatch(fetchPinOptionSetsForCompanyFailure(err.message)));
};
