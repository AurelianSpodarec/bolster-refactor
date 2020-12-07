//http://api.admin.bolster-staging.com/companies/2/

import axios from 'axios';

import {
    FETCH_COMPANY_DROPDOWN_OPTIONS_REQUEST,
    FETCH_COMPANY_DROPDOWN_OPTIONS_SUCCESS,
    FETCH_COMPANY_DROPDOWN_OPTIONS_FAILURE,
} from 'constants/actionTypes/companies';
import { ADMIN_API_URL } from 'config';
import { getHeaders } from 'helpers/api';

export const fetchTemplatesRequest = () => ({
    type: FETCH_COMPANY_DROPDOWN_OPTIONS_REQUEST,
});

export const fetchTemplatesSuccess = payload => ({
    type: FETCH_COMPANY_DROPDOWN_OPTIONS_SUCCESS,
    payload,
});

export const fetchTemplatesFailure = error => ({
    type: FETCH_COMPANY_DROPDOWN_OPTIONS_FAILURE,
    error,
});

export default companyID => dispatch => {
    dispatch(fetchTemplatesRequest());

    return axios
        .get(`${ADMIN_API_URL}/companies/${companyID}/dropdownoptions`, getHeaders())
        .then(res => dispatch(fetchTemplatesSuccess(res.data)))
        .catch(err => dispatch(fetchTemplatesFailure(err.message)));
};
