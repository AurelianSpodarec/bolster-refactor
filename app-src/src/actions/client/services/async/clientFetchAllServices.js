import axios from 'axios';
import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import {
    CLIENT_FETCH_ALL_SERVICES_REQUEST,
    CLIENT_FETCH_ALL_SERVICES_SUCCESS,
    CLIENT_FETCH_ALL_SERVICES_FAILURE
} from 'constants/client/actionTypes/clientServices';

export const clientFetchAllServicesRequest = () => ({
    type: CLIENT_FETCH_ALL_SERVICES_REQUEST
});

export const clientFetchAllServicesSuccess = payload => ({
    type: CLIENT_FETCH_ALL_SERVICES_SUCCESS,
    payload
});

export const clientFetchAllServicesFailure = error => ({
    type: CLIENT_FETCH_ALL_SERVICES_FAILURE,
    error
});

export default () => dispatch => {
    dispatch(clientFetchAllServicesRequest());

    return (
        axios
            // ! change this url
            .get(`${API_URL}/services`, getHeaders())
            .then(res => dispatch(clientFetchAllServicesSuccess(res.data)))
            .catch(err => dispatch(clientFetchAllServicesFailure(err.message)))
    );
};
