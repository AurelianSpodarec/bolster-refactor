import axios from 'axios';

import { getHeaders, handleErrors } from 'helpers/api';
import {
    FETCH_AUTH_AREA_TEXT_REQUEST,
    FETCH_AUTH_AREA_TEXT_SUCCESS,
    FETCH_AUTH_AREA_TEXT_FAILURE,
} from 'constants/actionTypes/auth';
import { FRONTEND_API_URL } from 'config';

export const fetchAuthAreaTextRequest = () => ({
    type: FETCH_AUTH_AREA_TEXT_REQUEST,
});

export const fetchAuthAreaTextSuccess = payload => ({
    type: FETCH_AUTH_AREA_TEXT_SUCCESS,
    payload,
});

export const fetchAuthAreaTextFailure = error => ({
    type: FETCH_AUTH_AREA_TEXT_FAILURE,
    error,
});

export default () => dispatch => {
    dispatch(fetchAuthAreaTextRequest());
    return axios
        .get(`${FRONTEND_API_URL}/text`, getHeaders())
        .then(res => dispatch(fetchAuthAreaTextSuccess(res.data)))
        .catch(err => dispatch(handleErrors(fetchAuthAreaTextFailure)(err)));
};
