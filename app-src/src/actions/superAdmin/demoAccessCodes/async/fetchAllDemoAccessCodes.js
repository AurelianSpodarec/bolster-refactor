import axios from 'axios';

import {
    FETCH_ALL_DEMO_ACCESS_CODES_REQUEST,
    FETCH_ALL_DEMO_ACCESS_CODES_SUCCESS,
    FETCH_ALL_DEMO_ACCESS_CODES_FAILURE,
} from 'constants/actionTypes/demoAccessCodes';

import { ADMIN_API_URL } from 'config';
import { getHeaders } from 'helpers/api';

export const fetchAllDemoAccessCodesRequest = () => ({
    type: FETCH_ALL_DEMO_ACCESS_CODES_REQUEST,
});

export const fetchAllDemoAccessCodesSuccess = payload => ({
    type: FETCH_ALL_DEMO_ACCESS_CODES_SUCCESS,
    payload,
});

export const fetchAllDemoAccessCodesFailure = error => ({
    type: FETCH_ALL_DEMO_ACCESS_CODES_FAILURE,
    error,
});

export default () => dispatch => {
    dispatch(fetchAllDemoAccessCodesRequest());

    return axios
        .get(`${ADMIN_API_URL}/demo`, getHeaders())
        .then(res => dispatch(fetchAllDemoAccessCodesSuccess(res.data)))
        .catch(err => dispatch(fetchAllDemoAccessCodesFailure(err.message)));
};
