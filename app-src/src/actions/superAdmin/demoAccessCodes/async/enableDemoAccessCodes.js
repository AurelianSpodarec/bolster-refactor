import axios from 'axios';

import {
    ENABLE_DEMO_ACCESS_CODES_REQUEST,
    ENABLE_DEMO_ACCESS_CODES_SUCCESS,
    ENABLE_DEMO_ACCESS_CODES_FAILURE,
} from 'constants/actionTypes/demoAccessCodes';

import { ADMIN_API_URL } from 'config';
import { getHeaders } from 'helpers/api';

export const enableDemoAccessCodesRequest = () => ({
    type: ENABLE_DEMO_ACCESS_CODES_REQUEST,
});

export const enableDemoAccessCodesSuccess = payload => ({
    type: ENABLE_DEMO_ACCESS_CODES_SUCCESS,
    payload,
});

export const enableDemoAccessCodesFailure = error => ({
    type: ENABLE_DEMO_ACCESS_CODES_FAILURE,
    error,
});

export default id => dispatch => {
    dispatch(enableDemoAccessCodesRequest());

    return axios
        .post(`${ADMIN_API_URL}/demo/disable/${id}?undo=true`, {}, getHeaders())
        .then(res => dispatch(enableDemoAccessCodesSuccess(res.data)))
        .catch(err => dispatch(enableDemoAccessCodesFailure(err.message)));
};
