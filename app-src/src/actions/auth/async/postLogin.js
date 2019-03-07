import axios from 'axios';

// import { overwriteFieldErrors } from 'actions/generic/fieldErrors/sync/overwriteFieldErrors'
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

export const postLoginFailure = payload => ({
    type: POST_LOGIN_FAILURE,
    payload
});

export default (email, password) => dispatch => {
    dispatch(postLoginRequest());

    return (
        axios
            // .post('mockData/auth/auth.json', { email, password }, getHeaders())
            .get('/mockData/auth/auth.json', getHeaders())
            .then(res => {
                localStorage.setItem('token', res.data.token);
                return res;
            })
            .then(res => dispatch(postLoginSuccess(res.data)))
            .catch(err => {
                dispatch(postLoginFailure(err));
                // dispatch(overwriteFieldErrors(err.fieldErrors))
            })
    );
};
