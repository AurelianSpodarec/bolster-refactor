import axios from 'axios';
import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import {
    COMPANY_ADMIN_FETCH_HISTORIC_SERVICES_REQUEST,
    COMPANY_ADMIN_FETCH_HISTORIC_SERVICES_SUCCESS,
    COMPANY_ADMIN_FETCH_HISTORIC_SERVICES_FAILURE
} from 'constants/actionTypes/services';

export const companyFetchHistoricServicesRequest = () => ({
    type: COMPANY_ADMIN_FETCH_HISTORIC_SERVICES_REQUEST
});

export const companyFetchHistoricServicesSuccess = payload => ({
    type: COMPANY_ADMIN_FETCH_HISTORIC_SERVICES_SUCCESS,
    payload
});

export const companyFetchHistoricServicesFailure = error => ({
    type: COMPANY_ADMIN_FETCH_HISTORIC_SERVICES_FAILURE,
    error
});

export default () => dispatch => {
    dispatch(companyFetchHistoricServicesRequest());

    return axios
        .get(`${API_URL}/services/company/historic`, getHeaders())
        .then(({ data }) => dispatch(companyFetchHistoricServicesSuccess(data)))
        .catch(err =>
            dispatch(companyFetchHistoricServicesFailure(err.message))
        );
};
