import axios from 'axios';

import {
    MARK_DEMO_REQUEST_REQUEST,
    MARK_DEMO_REQUEST_SUCCESS,
    MARK_DEMO_REQUEST_FAILURE,
} from 'constants/actionTypes/demoRequests';

import { ADMIN_API_URL } from 'config';
import { getHeaders } from 'helpers/api';

export const markDemoRequestRequest = () => ({
    type: MARK_DEMO_REQUEST_REQUEST,
});

export const markDemoRequestSuccess = data => ({
    type: MARK_DEMO_REQUEST_SUCCESS,
    data,
});

export const markDemoRequestFailure = error => ({
    type: MARK_DEMO_REQUEST_FAILURE,
    error,
});

export default (demoRequestID, postBody = {}) => dispatch => {
    dispatch(markDemoRequestRequest());
    return axios
        .patch(`${ADMIN_API_URL}/enquiries/demoRequest/${demoRequestID}`, postBody, getHeaders())
        .then(({ data }) => dispatch(markDemoRequestSuccess(data)))
        .catch(err => dispatch(markDemoRequestFailure(err.message)));
};
