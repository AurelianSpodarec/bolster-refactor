import axios from 'axios';
import { ADMIN_API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import {
    ADMIN_FETCH_SINGLE_SERVICE_REQUEST,
    ADMIN_FETCH_SINGLE_SERVICE_SUCCESS,
    ADMIN_FETCH_SINGLE_SERVICE_FAILURE
} from 'constants/actionTypes/services';

export const fetchSingleServiceRequest = () => ({
    type: ADMIN_FETCH_SINGLE_SERVICE_REQUEST
});

export const fetchSingleServiceSuccess = payload => ({
    type: ADMIN_FETCH_SINGLE_SERVICE_SUCCESS,
    payload
});

export const fetchSingleServiceFailure = error => ({
    type: ADMIN_FETCH_SINGLE_SERVICE_FAILURE,
    error
});

export default id => dispatch => {
    dispatch(fetchSingleServiceRequest());

    axios
        .get(`${ADMIN_API_URL}/services/${id}`, getHeaders())
        .then(res => dispatch(fetchSingleServiceSuccess(res.data)))
        .catch(err => dispatch(fetchSingleServiceFailure(err.message)));
};
