import axios from 'axios';

import {
    FETCH_ALL_SOS_CODES_REQUEST,
    FETCH_ALL_SOS_CODES_SUCCESS,
    FETCH_ALL_SOS_CODES_FAILURE
} from 'constants/actionTypes/superAdminSOSCodes';
import { ADMIN_API_URL } from 'config';
import { getHeaders } from 'helpers/api';

export const fetchSOSCodesRequest = () => ({
    type: FETCH_ALL_SOS_CODES_REQUEST
});

export const fetchSOSCodesSuccess = payload => ({
    type: FETCH_ALL_SOS_CODES_SUCCESS,
    payload
});

export const fetchSOSCodesFailure = error => ({
    type: FETCH_ALL_SOS_CODES_FAILURE,
    error
});

export default () => dispatch => {
    dispatch(fetchSOSCodesRequest());

    return axios
        .get(`${ADMIN_API_URL}/soscodes`, getHeaders())
        .then(({ data }) => dispatch(fetchSOSCodesSuccess(data)))
        .catch(err => dispatch(fetchSOSCodesFailure(err.message)));
};
