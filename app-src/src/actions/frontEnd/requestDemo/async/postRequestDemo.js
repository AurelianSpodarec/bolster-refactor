import axios from 'axios';

import { getHeaders, handleErrors } from 'helpers/api';
import {
    POST_REQUEST_DEMO_REQUEST,
    POST_REQUEST_DEMO_SUCCESS,
    POST_REQUEST_DEMO_FAILURE
} from 'constants/actionTypes/requestDemo';
import { FRONTEND_API_URL } from 'config';

export const postRequestDemoRequest = () => ({
    type: POST_REQUEST_DEMO_REQUEST
});

export const postRequestDemoSuccess = payload => ({
    type: POST_REQUEST_DEMO_SUCCESS,
    payload
});

export const postRequestDemoFailure = error => ({
    type: POST_REQUEST_DEMO_FAILURE,
    error
});

export default postBody => dispatch => {
    dispatch(postRequestDemoRequest());

    return axios
        .post(`${FRONTEND_API_URL}/enquiries/demo`, postBody, getHeaders())
        .then(res => dispatch(postRequestDemoSuccess(res.data)))
        .catch(err => dispatch(handleErrors(postRequestDemoFailure)(err)));
};
