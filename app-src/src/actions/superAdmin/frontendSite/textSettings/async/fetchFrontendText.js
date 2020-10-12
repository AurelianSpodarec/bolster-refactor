import axios from 'axios';

import {
    ADMIN_FETCH_FRONTEND_TEXT_REQUEST,
    ADMIN_FETCH_FRONTEND_TEXT_SUCCESS,
    ADMIN_FETCH_FRONTEND_TEXT_FAILURE,
} from 'constants/actionTypes/frontendTextSettings';

import { ADMIN_API_URL } from 'config';
import { getHeaders } from 'helpers/api';

export const fetchFrontendTextRequest = () => ({
    type: ADMIN_FETCH_FRONTEND_TEXT_REQUEST,
});
export const fetchFrontendTextSuccess = payload => ({
    type: ADMIN_FETCH_FRONTEND_TEXT_SUCCESS,
    payload,
});
export const fetchFrontendTextFailure = error => ({
    type: ADMIN_FETCH_FRONTEND_TEXT_FAILURE,
    error,
});

export default () => dispatch => {
    dispatch(fetchFrontendTextRequest());
    return axios
        .get(`${ADMIN_API_URL}/FrontEndSettings/text`, getHeaders())
        .then(({ data }) => dispatch(fetchFrontendTextSuccess(data)))
        .catch(err => dispatch(fetchFrontendTextFailure(err.message)));
};
