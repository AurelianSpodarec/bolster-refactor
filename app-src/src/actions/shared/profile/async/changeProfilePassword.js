import axios from 'axios';

import { AUTH_API_URL } from 'config';
import { getHeaders, handleErrors } from 'helpers/api';
import {
    CHANGE_PROFILE_PASSWORD_REQUEST,
    CHANGE_PROFILE_PASSWORD_SUCCESS,
    CHANGE_PROFILE_PASSWORD_FAILURE
} from 'constants/actionTypes/profile';

export const changeProfilePasswordRequest = () => ({
    type: CHANGE_PROFILE_PASSWORD_REQUEST
});

export const changeProfilePasswordSuccess = payload => ({
    type: CHANGE_PROFILE_PASSWORD_SUCCESS,
    payload
});

export const changeProfilePasswordFailure = error => ({
    type: CHANGE_PROFILE_PASSWORD_FAILURE,
    error
});

export default postBody => dispatch => {
    dispatch(changeProfilePasswordRequest());
    return axios
        .post(`${AUTH_API_URL}/profile/password`, postBody, getHeaders())
        .then(res => dispatch(changeProfilePasswordSuccess(res.data)))
        .catch(err => {
            const errorAction = handleErrors(changeProfilePasswordFailure);
            dispatch(errorAction(err));
        });
};
