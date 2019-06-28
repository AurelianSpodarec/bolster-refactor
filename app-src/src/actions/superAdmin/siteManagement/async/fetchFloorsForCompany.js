import axios from 'axios';

import {
    ADMIN_FETCH_FLOORS_FOR_COMPANY_REQUEST,
    ADMIN_FETCH_FLOORS_FOR_COMPANY_SUCCESS,
    ADMIN_FETCH_FLOORS_FOR_COMPANY_FAILURE
} from 'constants/actionTypes/companies';
import { ADMIN_API_URL } from 'config';
import { getHeaders } from 'helpers/api';

export const adminFetchFloorsForCompanyRequest = () => ({
    type: ADMIN_FETCH_FLOORS_FOR_COMPANY_REQUEST
});

export const adminFetchFloorsForCompanySuccess = payload => ({
    type: ADMIN_FETCH_FLOORS_FOR_COMPANY_SUCCESS,
    payload
});

export const adminFetchFloorsForCompanyFailure = error => ({
    type: ADMIN_FETCH_FLOORS_FOR_COMPANY_FAILURE,
    error
});

export default companyID => dispatch => {
    dispatch(adminFetchFloorsForCompanyRequest());

    return axios
        .get(`${ADMIN_API_URL}/floors/${companyID}`, getHeaders())
        .then(res => dispatch(adminFetchFloorsForCompanySuccess(res.data)))
        .catch(err => dispatch(adminFetchFloorsForCompanyFailure(err.message)));
};
