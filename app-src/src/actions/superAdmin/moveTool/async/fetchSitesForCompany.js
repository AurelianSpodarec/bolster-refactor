import axios from 'axios';

import {
    ADMIN_FETCH_SITES_FOR_COMPANY_REQUEST,
    ADMIN_FETCH_SITES_FOR_COMPANY_SUCCESS,
    ADMIN_FETCH_SITES_FOR_COMPANY_FAILURE
} from 'constants/actionTypes/companies';
import { ADMIN_API_URL } from 'config';
import { getHeaders } from 'helpers/api';

export const adminFetchSitesForCompanyRequest = () => ({
    type: ADMIN_FETCH_SITES_FOR_COMPANY_REQUEST
});

export const adminFetchSitesForCompanySuccess = payload => ({
    type: ADMIN_FETCH_SITES_FOR_COMPANY_SUCCESS,
    payload
});

export const adminFetchSitesForCompanyFailure = error => ({
    type: ADMIN_FETCH_SITES_FOR_COMPANY_FAILURE,
    error
});

export default companyID => dispatch => {
    dispatch(adminFetchSitesForCompanyRequest());

    return axios
        .get(`${ADMIN_API_URL}/sites/${companyID}`, getHeaders())
        .then(res => dispatch(adminFetchSitesForCompanySuccess(res.data)))
        .catch(err => dispatch(adminFetchSitesForCompanyFailure(err.message)));
};
