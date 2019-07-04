import axios from 'axios';

import {
    ADMIN_FETCH_BUILDINGS_FOR_COMPANY_REQUEST,
    ADMIN_FETCH_BUILDINGS_FOR_COMPANY_SUCCESS,
    ADMIN_FETCH_BUILDINGS_FOR_COMPANY_FAILURE
} from 'constants/actionTypes/companies';
import { ADMIN_API_URL } from 'config';
import { getHeaders } from 'helpers/api';

export const adminFetchBuildingsForCompanyRequest = () => ({
    type: ADMIN_FETCH_BUILDINGS_FOR_COMPANY_REQUEST
});

export const adminFetchBuildingsForCompanySuccess = payload => ({
    type: ADMIN_FETCH_BUILDINGS_FOR_COMPANY_SUCCESS,
    payload
});

export const adminFetchBuildingsForCompanyFailure = error => ({
    type: ADMIN_FETCH_BUILDINGS_FOR_COMPANY_FAILURE,
    error
});

export default companyID => dispatch => {
    dispatch(adminFetchBuildingsForCompanyRequest());

    return axios
        .get(`${ADMIN_API_URL}/buildings/${companyID}`, getHeaders())
        .then(res => dispatch(adminFetchBuildingsForCompanySuccess(res.data)))
        .catch(err =>
            dispatch(adminFetchBuildingsForCompanyFailure(err.message))
        );
};
