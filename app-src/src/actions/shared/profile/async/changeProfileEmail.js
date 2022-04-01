import axios from 'axios';

import { AUTH_API_URL } from 'config';
import { getHeaders, handleErrors } from 'helpers/api';
import {
    CHANGE_PROFILE_EMAIL_REQUEST,
    CHANGE_PROFILE_EMAIL_SUCCESS,
    CHANGE_PROFILE_EMAIL_FAILURE,
    CHANGE_PROFILE_EMAIL_MODAL,
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

export const changeProfileEmailModal = payload => ({
    type: CHANGE_PROFILE_EMAIL_MODAL,
    payload,
});

export default postBody => dispatch => {
    dispatch(changeProfileEmailRequest());
    console.log({ postBody });
    return axios
        .post(`${AUTH_API_URL}/profile/email`, postBody, getHeaders())
        .then(res => {
            if (res.status === 202) {
                dispatch(changeProfileEmailModal(res.data));
            } else {
                dispatch(changeProfileEmailSuccess(res.data));
            }
        })
        .catch(err => {
            const errorAction = handleErrors(changeProfileEmailFailure);
            dispatch(errorAction(err));
        });
};
