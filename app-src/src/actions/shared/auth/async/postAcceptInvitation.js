import axios from 'axios';

import { getHeaders, handleErrors } from 'helpers/api';
import {
    POST_ACCEPT_INVITATION_REQUEST,
    POST_ACCEPT_INVITATION_SUCCESS,
    POST_ACCEPT_INVITATION_FAILURE,
} from 'constants/actionTypes/auth';
import { AUTH_API_URL } from 'config';

export const postAcceptInvitationRequest = () => ({
    type: POST_ACCEPT_INVITATION_REQUEST,
});

export const postAcceptInvitationSuccess = () => ({
    type: POST_ACCEPT_INVITATION_SUCCESS,
});

export const postAcceptInvitationFailure = error => ({
    type: POST_ACCEPT_INVITATION_FAILURE,
    error,
});

export default postBody => dispatch => {
    dispatch(postAcceptInvitationRequest());

    return axios
        .post(`${AUTH_API_URL}/auth/acceptInvitation`, postBody, getHeaders())
        .then(({ data }) => {
            localStorage.setItem('token', data.token);
            dispatch(postAcceptInvitationSuccess(data));
        })
        .catch(err => {
            if (typeof err?.response?.data === 'string') {
                dispatch(postAcceptInvitationFailure(err.response.data));
            } else {
                dispatch(handleErrors(postAcceptInvitationFailure)(err));
            }
        });
};
