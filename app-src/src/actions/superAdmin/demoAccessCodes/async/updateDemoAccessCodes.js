import axios from 'axios';

import {
    UPDATE_DEMO_ACCESS_CODES_REQUEST,
    UPDATE_DEMO_ACCESS_CODES_SUCCESS,
    UPDATE_DEMO_ACCESS_CODES_FAILURE,
} from 'constants/actionTypes/demoAccessCodes';

import { ADMIN_API_URL } from 'config';
import { getHeaders } from 'helpers/api';

export const updateDemoAccessCodesRequest = () => ({
    type: UPDATE_DEMO_ACCESS_CODES_REQUEST,
});

export const updateDemoAccessCodesSuccess = payload => ({
    type: UPDATE_DEMO_ACCESS_CODES_SUCCESS,
    payload,
});

export const updateDemoAccessCodesFailure = error => ({
    type: UPDATE_DEMO_ACCESS_CODES_FAILURE,
    error,
});

export default (id, postBody) => dispatch => {
    dispatch(updateDemoAccessCodesRequest());

    return axios
        .put(`${ADMIN_API_URL}/demo/${id}`, postBody, getHeaders())
        .then(res => dispatch(updateDemoAccessCodesSuccess(res.data)))
        .catch(err => dispatch(updateDemoAccessCodesFailure(err.message)));
};
