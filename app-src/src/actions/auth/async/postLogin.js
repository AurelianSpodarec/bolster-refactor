import axios from 'axios';
import { API_URL } from 'config/index';

import setAPIFieldErrors from 'actions/generic/fieldErrors/sync/setAPIFieldErrors';
import { getHeaders } from 'helpers/api';
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

export const postLoginFailure = () => ({
    type: POST_LOGIN_FAILURE
});

export default (email, password) => dispatch => {
    dispatch(postLoginRequest());

    return axios
        .post(`${API_URL}/auth/login`, { email, password }, getHeaders())
        .then(res => {
            localStorage.setItem('token', res.data.token);
            return res;
        })
        .then(res => dispatch(postLoginSuccess(res.data)))
        .catch(err => {
            dispatch(postLoginFailure());

            if (err.response.status === 400)
                dispatch(setAPIFieldErrors(err.response.data.errors));
        });
};
