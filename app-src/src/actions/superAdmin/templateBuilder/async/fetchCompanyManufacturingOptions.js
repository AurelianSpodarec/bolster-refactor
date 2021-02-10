//http://api.admin.bolster-staging.com/companies/2/

import axios from 'axios';

import {
    FETCH_COMPANY_MANUFACTURING_OPTIONS_REQUEST,
    FETCH_COMPANY_MANUFACTURING_OPTIONS_SUCCESS,
    FETCH_COMPANY_MANUFACTURING_OPTIONS_FAILURE,
} from 'constants/actionTypes/companies';
import { ADMIN_API_URL } from 'config';
import { getHeaders } from 'helpers/api';

export const fetchCompanyManufacturerOptionsRequest = () => ({
    type: FETCH_COMPANY_MANUFACTURING_OPTIONS_REQUEST,
});

export const fetchCompanyManufacturerOptionsSuccess = payload => ({
    type: FETCH_COMPANY_MANUFACTURING_OPTIONS_SUCCESS,
    payload,
});

export const fetchCompanyManufacturerOptionsFailure = error => ({
    type: FETCH_COMPANY_MANUFACTURING_OPTIONS_FAILURE,
    error,
});

export default companyID => dispatch => {
    dispatch(fetchCompanyManufacturerOptionsRequest());

    return axios
        .get(`${ADMIN_API_URL}/manufacturer/optionvalues/company/${companyID}`, getHeaders())
        .then(res => dispatch(fetchCompanyManufacturerOptionsSuccess(res.data)))
        .catch(err => dispatch(fetchCompanyManufacturerOptionsFailure(err.message)));
};
