import axios from 'axios';

import {
    FORCE_CONFIRM_USER_EMAIL_REQUEST,
    FORCE_CONFIRM_USER_EMAIL_SUCCESS,
    FORCE_CONFIRM_USER_EMAIL_FAILURE,
} from 'constants/actionTypes/users';

import { ADMIN_API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import setAPIFieldErrors from 'actions/shared/generic/fieldErrors/sync/setAPIFieldErrors';

export const forceConfirmUserEmailRequest = () => ({
    type: FORCE_CONFIRM_USER_EMAIL_REQUEST,
});
export const forceConfirmUserEmailSuccess = payload => ({
    type: FORCE_CONFIRM_USER_EMAIL_SUCCESS,
    payload,
});
export const forceConfirmUserEmailFailure = error => ({
    type: FORCE_CONFIRM_USER_EMAIL_FAILURE,
    error,
});

export default (userID, postBody) => dispatch => {
    dispatch(forceConfirmUserEmailRequest());
    return axios
        .post(`${ADMIN_API_URL}/users/${userID}/confirm-email`, postBody, getHeaders())
        .then(({ data }) => dispatch(forceConfirmUserEmailSuccess(data)))
        .catch(err => {
            dispatch(forceConfirmUserEmailFailure(err.message));
            if (err.response.status === 400) {
                dispatch(setAPIFieldErrors(err.response.data.errors));
            }
        });
};
