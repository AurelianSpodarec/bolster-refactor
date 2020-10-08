import axios from 'axios';

import {
    ADMIN_FETCH_TRUSTED_BY_REQUEST,
    ADMIN_FETCH_TRUSTED_BY_SUCCESS,
    ADMIN_FETCH_TRUSTED_BY_FAILURE,
} from 'constants/actionTypes/homeSettings';

import { ADMIN_API_URL } from 'config';
import { getHeaders } from 'helpers/api';

export const fetchTrustedByRequest = () => ({
    type: ADMIN_FETCH_TRUSTED_BY_REQUEST,
});
export const fetchTrustedBySuccess = payload => ({
    type: ADMIN_FETCH_TRUSTED_BY_SUCCESS,
    payload,
});
export const fetchTrustedByFailure = error => ({
    type: ADMIN_FETCH_TRUSTED_BY_FAILURE,
    error,
});

export default () => dispatch => {
    dispatch(fetchTrustedByRequest());

    return axios
        .get(`${ADMIN_API_URL}/FrontEndSettings`, getHeaders())
        .then(({ data }) => dispatch(fetchTrustedBySuccess(data)))
        .catch(err => dispatch(fetchTrustedByFailure(err.message)));
};
