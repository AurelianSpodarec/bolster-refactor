import axios from 'axios';

import {
    ADMIN_EDIT_USER_EMAIL_REQUEST,
    ADMIN_EDIT_USER_EMAIL_SUCCESS,
    ADMIN_EDIT_USER_EMAIL_FAILURE,
    ADMIN_EDIT_USER_EMAIL_SHOW_MODAL,
} from 'constants/actionTypes/users';

import { ADMIN_API_URL } from 'config';
import { getHeaders, handleErrors } from 'helpers/api';

export const editUserEmailRequest = () => ({
    type: ADMIN_EDIT_USER_EMAIL_REQUEST,
});
export const editUserEmailSuccess = payload => ({
    type: ADMIN_EDIT_USER_EMAIL_SUCCESS,
    payload,
});
export const editUserEmailFailure = error => ({
    type: ADMIN_EDIT_USER_EMAIL_FAILURE,
    error,
});

export const editUserEmailShowModal = payload => ({
    type: ADMIN_EDIT_USER_EMAIL_SHOW_MODAL,
    payload,
});

export default (userID, postBody) => dispatch => {
    dispatch(editUserEmailRequest());
    return axios
        .post(`${ADMIN_API_URL}/users/${userID}/email`, postBody, getHeaders())
        .then(({ data, status }) => {
            if (status === 202) {
                return dispatch(editUserEmailShowModal(data));
            }

            return dispatch(editUserEmailSuccess(data));
        })
        .catch(err => dispatch(handleErrors(editUserEmailFailure)(err)));
};
