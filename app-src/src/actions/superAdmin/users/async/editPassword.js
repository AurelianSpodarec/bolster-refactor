import axios from 'axios';

import {
    EDIT_USER_PASSWORD_REQUEST,
    EDIT_USER_PASSWORD_SUCCESS,
    EDIT_USER_PASSWORD_FAILURE
} from 'constants/actionTypes/users';

import { ADMIN_API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import setAPIFieldErrors from 'actions/shared/generic/fieldErrors/sync/setAPIFieldErrors';

export const editUserRequest = () => ({
    type: EDIT_USER_PASSWORD_REQUEST
});
export const editUserSuccess = payload => ({
    type: EDIT_USER_PASSWORD_SUCCESS,
    payload
});
export const editUserFailure = error => ({
    type: EDIT_USER_PASSWORD_FAILURE,
    error
});

export default (userID, postBody) => dispatch => {
    dispatch(editUserRequest());
    return axios
        .post(
            `${ADMIN_API_URL}/users/${userID}/password`,
            postBody,
            getHeaders()
        )
        .then(({ data }) => dispatch(editUserSuccess(data)))
        .catch(err => {
            dispatch(editUserFailure(err.message));
            if (err.response.status === 400) {
                dispatch(setAPIFieldErrors(err.response.data.errors));
            }
        });
};
