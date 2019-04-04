import axios from 'axios';
import { ADMIN_API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import {
    ADMIN_FETCH_ALL_SERVICES_REQUEST,
    ADMIN_FETCH_ALL_SERVICES_SUCCESS,
    ADMIN_FETCH_ALL_SERVICES_FAILURE
} from 'constants/actionTypes/services';

export const fetchAllServicesRequest = () => ({
    type: ADMIN_FETCH_ALL_SERVICES_REQUEST
});

export const fetchAllServicesSuccess = payload => ({
    type: ADMIN_FETCH_ALL_SERVICES_SUCCESS,
    payload
});

export const fetchAllServicesFailure = error => ({
    type: ADMIN_FETCH_ALL_SERVICES_FAILURE,
    error
});

export default () => dispatch => {
    dispatch(fetchAllServicesRequest());

    axios
        .get(`${ADMIN_API_URL}/services`, getHeaders())
        .then(res => dispatch(fetchAllServicesSuccess(res.data)))
        .catch(err => dispatch(fetchAllServicesFailure(err.message)));
};
