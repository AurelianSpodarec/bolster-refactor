import axios from 'axios';

import {
    REMOVE_USER_LOCKOUT_REQUEST,
    REMOVE_USER_LOCKOUT_SUCCESS,
    REMOVE_USER_LOCKOUT_FAILURE,
} from 'constants/actionTypes/users';

import { ADMIN_API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import setAPIFieldErrors from 'actions/shared/generic/fieldErrors/sync/setAPIFieldErrors';

export const removeUserLockoutRequest = () => ({
    type: REMOVE_USER_LOCKOUT_REQUEST,
});
export const removeUserLockoutSuccess = payload => ({
    type: REMOVE_USER_LOCKOUT_SUCCESS,
    payload,
});
export const removeUserLockoutFailure = error => ({
    type: REMOVE_USER_LOCKOUT_FAILURE,
    error,
});

export default userID => dispatch => {
    dispatch(removeUserLockoutRequest());
    return axios
        .post(`${ADMIN_API_URL}/users/${userID}/end-lockout`, {}, getHeaders())
        .then(({ data }) => dispatch(removeUserLockoutSuccess(data)))
        .catch(err => {
            dispatch(removeUserLockoutFailure(err.message));
            if (err.response.status === 400) {
                dispatch(setAPIFieldErrors(err.response.data.errors));
            }
        });
};
