import axios from 'axios';

import {
    ADMIN_FETCH_LOGIN_TEXT_REQUEST,
    ADMIN_FETCH_LOGIN_TEXT_SUCCESS,
    ADMIN_FETCH_LOGIN_TEXT_FAILURE,
} from 'constants/actionTypes/frontendTextSettings';

import { ADMIN_API_URL } from 'config';
import { getHeaders } from 'helpers/api';

export const fetchLoginTextRequest = () => ({
    type: ADMIN_FETCH_LOGIN_TEXT_REQUEST,
});
export const fetchLoginTextSuccess = payload => ({
    type: ADMIN_FETCH_LOGIN_TEXT_SUCCESS,
    payload,
});
export const fetchLoginTextFailure = error => ({
    type: ADMIN_FETCH_LOGIN_TEXT_FAILURE,
    error,
});

export default () => dispatch => {
    dispatch(fetchLoginTextRequest());
    return axios
        .get(`${ADMIN_API_URL}/FrontEndSettings/logintext`, getHeaders())
        .then(({ data }) => dispatch(fetchLoginTextSuccess(data)))
        .catch(err => dispatch(fetchLoginTextFailure(err.message)));
};
