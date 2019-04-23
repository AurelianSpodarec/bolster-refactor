import axios from 'axios';

import {
    POST_REGISTER_REQUEST,
    POST_REGISTER_SUCCESS,
    POST_REGISTER_FAILURE
} from 'constants/actionTypes/auth';
import { getHeaders, handleErrors } from 'helpers/api';
import { AUTH_API_URL } from 'config';

export const postRegisterRequest = () => ({
    type: POST_REGISTER_REQUEST
});

export const postRegisterSuccess = payload => ({
    type: POST_REGISTER_SUCCESS,
    payload
});

export const postRegisterFailure = error => ({
    type: POST_REGISTER_FAILURE,
    error
});

export default postBody => dispatch => {
    dispatch(postRegisterRequest());

    axios
        .post(`${AUTH_API_URL}/auth/register`, postBody, getHeaders())
        .then(res => dispatch(postRegisterSuccess(res.data)))
        .catch(err => dispatch(handleErrors(postRegisterFailure)(err)));
};
