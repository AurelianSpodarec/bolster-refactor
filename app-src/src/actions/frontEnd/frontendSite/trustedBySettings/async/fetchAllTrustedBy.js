import axios from 'axios';

import {
    FETCH_TRUSTED_BY_REQUEST,
    FETCH_TRUSTED_BY_SUCCESS,
    FETCH_TRUSTED_BY_FAILURE,
} from 'constants/actionTypes/frontendTrustedBySettings';

import { getHeaders } from 'helpers/api';
import { FRONTEND_API_URL } from 'config';

export const fetchTrustedByRequest = () => ({
    type: FETCH_TRUSTED_BY_REQUEST,
});
export const fetchTrustedBySuccess = payload => ({
    type: FETCH_TRUSTED_BY_SUCCESS,
    payload,
});
export const fetchTrustedByFailure = error => ({
    type: FETCH_TRUSTED_BY_FAILURE,
    error,
});

export default () => dispatch => {
    dispatch(fetchTrustedByRequest());

    return axios
        .get(`${FRONTEND_API_URL}/images`, getHeaders())
        .then(({ data }) => dispatch(fetchTrustedBySuccess(data)))
        .catch(err => dispatch(fetchTrustedByFailure(err.message)));
};
