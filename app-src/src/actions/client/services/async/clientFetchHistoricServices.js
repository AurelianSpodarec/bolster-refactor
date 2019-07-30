import axios from 'axios';
import { CLIENT_API_URL } from 'config/index';
import { getHeaders } from 'helpers/api';
import {
    CLIENT_FETCH_HISTORIC_SERVICES_REQUEST,
    CLIENT_FETCH_HISTORIC_SERVICES_SUCCESS,
    CLIENT_FETCH_HISTORIC_SERVICES_FAILURE
} from 'constants/client/actionTypes/clientServices';

export const clientFetchHistoricServicesRequest = () => ({
    type: CLIENT_FETCH_HISTORIC_SERVICES_REQUEST
});

export const clientFetchHistoricServicesSuccess = payload => ({
    type: CLIENT_FETCH_HISTORIC_SERVICES_SUCCESS,
    payload
});

export const clientFetchHistoricServicesFailure = error => ({
    type: CLIENT_FETCH_HISTORIC_SERVICES_FAILURE,
    error
});

export default companyID => dispatch => {
    dispatch(clientFetchHistoricServicesRequest());

    return axios
        .get(
            `${CLIENT_API_URL}/services/company/${companyID}/historic`,
            getHeaders()
        )
        .then(({ data }) => dispatch(clientFetchHistoricServicesSuccess(data)))
        .catch(err =>
            dispatch(clientFetchHistoricServicesFailure(err.message))
        );
};
