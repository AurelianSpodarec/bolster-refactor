import axios from 'axios';
import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import {
    COMPANY_ADMIN_FETCH_ALL_SERVICES_REQUEST,
    COMPANY_ADMIN_FETCH_ALL_SERVICES_SUCCESS,
    COMPANY_ADMIN_FETCH_ALL_SERVICES_FAILURE
} from 'constants/actionTypes/services';

export const companyFetchAllServicesRequest = () => ({
    type: COMPANY_ADMIN_FETCH_ALL_SERVICES_REQUEST
});

export const companyFetchAllServicesSuccess = payload => ({
    type: COMPANY_ADMIN_FETCH_ALL_SERVICES_SUCCESS,
    payload
});

export const companyFetchAllServicesFailure = error => ({
    type: COMPANY_ADMIN_FETCH_ALL_SERVICES_FAILURE,
    error
});

export default () => dispatch => {
    dispatch(companyFetchAllServicesRequest());

    return axios
        .get(`${API_URL}/services`, getHeaders())
        .then(res => dispatch(companyFetchAllServicesSuccess(res.data)))
        .catch(err => dispatch(companyFetchAllServicesFailure(err.message)));
};
