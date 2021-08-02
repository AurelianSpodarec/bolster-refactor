import axios from 'axios';

import {
    DISABLE_DEMO_ACCESS_CODES_REQUEST,
    DISABLE_DEMO_ACCESS_CODES_SUCCESS,
    DISABLE_DEMO_ACCESS_CODES_FAILURE,
} from 'constants/actionTypes/demoAccessCodes';

import { ADMIN_API_URL } from 'config';
import { getHeaders } from 'helpers/api';

export const disableDemoAccessCodesRequest = () => ({
    type: DISABLE_DEMO_ACCESS_CODES_REQUEST,
});

export const disableDemoAccessCodesSuccess = payload => ({
    type: DISABLE_DEMO_ACCESS_CODES_SUCCESS,
    payload,
});

export const disableDemoAccessCodesFailure = error => ({
    type: DISABLE_DEMO_ACCESS_CODES_FAILURE,
    error,
});

export default id => dispatch => {
    dispatch(disableDemoAccessCodesRequest());

    return axios
        .post(`${ADMIN_API_URL}/demo/disable/${id}?undo=false`, {}, getHeaders())
        .then(res => dispatch(disableDemoAccessCodesSuccess(res.data)))
        .catch(err => dispatch(disableDemoAccessCodesFailure(err.message)));
};
