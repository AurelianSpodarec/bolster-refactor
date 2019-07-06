import axios from 'axios';

import {
    FETCH_ALL_DEMO_REQUESTS_REQUEST,
    FETCH_ALL_DEMO_REQUESTS_SUCCESS,
    FETCH_ALL_DEMO_REQUESTS_FAILURE
} from 'constants/actionTypes/demoRequests';
import { ADMIN_API_URL } from 'config';
import { getHeaders } from 'helpers/api';

export const fetchDemoRequestsRequest = () => ({
    type: FETCH_ALL_DEMO_REQUESTS_REQUEST
});

export const fetchDemoRequestsSuccess = payload => ({
    type: FETCH_ALL_DEMO_REQUESTS_SUCCESS,
    payload
});

export const fetchDemoRequestsFailure = error => ({
    type: FETCH_ALL_DEMO_REQUESTS_FAILURE,
    error
});

export default () => dispatch => {
    dispatch(fetchDemoRequestsRequest());

    return axios
        .get(`${ADMIN_API_URL}/enquiries/demo`, getHeaders())
        .then(res => dispatch(fetchDemoRequestsSuccess(res.data)))
        .catch(err => dispatch(fetchDemoRequestsFailure(err.message)));
};
