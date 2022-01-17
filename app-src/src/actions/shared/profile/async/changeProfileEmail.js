import axios from 'axios';

import { AUTH_API_URL } from 'config';
import { getHeaders, handleErrors } from 'helpers/api';
import {
    CHANGE_PROFILE_EMAIL_REQUEST,
    CHANGE_PROFILE_EMAIL_SUCCESS,
    CHANGE_PROFILE_EMAIL_FAILURE,
} from 'constants/actionTypes/profile';

export const changeProfileEmailRequest = () => ({
    type: CHANGE_PROFILE_EMAIL_REQUEST,
});

export const changeProfileEmailSuccess = payload => ({
    type: CHANGE_PROFILE_EMAIL_SUCCESS,
    payload,
});

export const changeProfileEmailFailure = error => ({
    type: CHANGE_PROFILE_EMAIL_FAILURE,
    error,
});

export default postBody => dispatch => {
    dispatch(changeProfileEmailRequest());
    return axios
        .patch(`${AUTH_API_URL}/profile/email-preferences`, postBody, getHeaders())
        .then(res => dispatch(changeProfileEmailSuccess(res.data)))
        .catch(err => {
            const errorAction = handleErrors(changeProfileEmailFailure);
            dispatch(errorAction(err));
        });
};
