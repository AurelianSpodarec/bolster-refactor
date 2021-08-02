import axios from 'axios';

import {
    POST_DEMO_ACCESS_CODES_REQUEST,
    POST_DEMO_ACCESS_CODES_SUCCESS,
    POST_DEMO_ACCESS_CODES_FAILURE,
} from 'constants/actionTypes/demoAccessCodes';

import { ADMIN_API_URL } from 'config';
import { getHeaders } from 'helpers/api';

export const postDemoAccessCodesRequest = () => ({
    type: POST_DEMO_ACCESS_CODES_REQUEST,
});

export const postDemoAccessCodesSuccess = payload => ({
    type: POST_DEMO_ACCESS_CODES_SUCCESS,
    actionType: 'add',
    payload,
});

export const postDemoAccessCodesFailure = error => ({
    type: POST_DEMO_ACCESS_CODES_FAILURE,
    error,
});

export default postBody => dispatch => {
    dispatch(postDemoAccessCodesRequest());

    return axios
        .post(`${ADMIN_API_URL}/demo`, postBody, getHeaders())
        .then(res => dispatch(postDemoAccessCodesSuccess(res.data)))
        .catch(err => dispatch(postDemoAccessCodesFailure(err.message)));
};
