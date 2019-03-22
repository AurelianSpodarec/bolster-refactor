import axios from 'axios';
import { ADMIN_API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import {
    FETCH_ALL_SERVICES_REQUEST,
    FETCH_ALL_SERVICES_SUCCESS,
    FETCH_ALL_SERVICES_FAILURE
} from 'constants/actionTypes/services';

export const fetchAllServicesRequest = () => ({
    type: FETCH_ALL_SERVICES_REQUEST
});

export const fetchAllServicesSuccess = payload => ({
    type: FETCH_ALL_SERVICES_SUCCESS,
    payload
});

export const fetchAllServicesFailure = error => ({
    type: FETCH_ALL_SERVICES_FAILURE,
    error
});

export default () => dispatch => {
    dispatch(fetchAllServicesRequest());

    axios
        .get(`${ADMIN_API_URL}/services`, getHeaders())
        .then(res => dispatch(fetchAllServicesSuccess(res.data)))
        .catch(err => dispatch(fetchAllServicesFailure(err.message)));
};
