import axios from 'axios';

import { AUTH_API_URL } from 'config/index';
import { getHeaders } from 'helpers/api';
import setAPIFieldErrors from 'actions/generic/fieldErrors/sync/setAPIFieldErrors';
import {
    POST_LOGIN_REQUEST,
    POST_LOGIN_SUCCESS,
    POST_LOGIN_FAILURE
} from 'constants/actionTypes/auth';

export const postLoginRequest = () => ({
    type: POST_LOGIN_REQUEST
});

export const postLoginSuccess = payload => ({
    type: POST_LOGIN_SUCCESS,
    payload
});

export const postLoginFailure = error => ({
    type: POST_LOGIN_FAILURE,
    error
});

export default (email, password) => dispatch => {
    dispatch(postLoginRequest());

    return axios
        .post(`${AUTH_API_URL}/login`, { email, password }, getHeaders())
        .then(res => {
            localStorage.setItem('token', res.data.token);
            return res;
        })
        .then(res => dispatch(postLoginSuccess(res.data)))
        .catch(err => {
            dispatch(postLoginFailure(err.message));

            if (err.response.status === 400)
                dispatch(setAPIFieldErrors(err.response.data.errors));
        });
};
