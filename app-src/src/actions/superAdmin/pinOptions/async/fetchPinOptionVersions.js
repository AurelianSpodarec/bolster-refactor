import axios from 'axios';

import { ADMIN_API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import {
    FETCH_ADMIN_PIN_OPTION_VERSIONS_REQUEST,
    FETCH_ADMIN_PIN_OPTION_VERSIONS_SUCCESS,
    FETCH_ADMIN_PIN_OPTION_VERSIONS_FAILURE,
} from 'constants/actionTypes/pinOptions';

export const fetchPinOptionVersionsRequest = () => ({
    type: FETCH_ADMIN_PIN_OPTION_VERSIONS_REQUEST,
});

export const fetchPinOptionVersionsSuccess = payload => ({
    type: FETCH_ADMIN_PIN_OPTION_VERSIONS_SUCCESS,
    payload,
});

export const fetchPinOptionVersionsFailure = error => ({
    type: FETCH_ADMIN_PIN_OPTION_VERSIONS_FAILURE,
    error,
});

export default () => async dispatch => {
    dispatch(fetchPinOptionVersionsRequest());

    return axios
        .get(`${ADMIN_API_URL}/pinoptions/versions`, getHeaders())
        .then(res => dispatch(fetchPinOptionVersionsSuccess(res.data)))
        .catch(err => dispatch(fetchPinOptionVersionsFailure(err.message)));
};
