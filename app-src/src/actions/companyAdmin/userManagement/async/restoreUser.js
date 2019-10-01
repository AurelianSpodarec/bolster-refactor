import axios from 'axios';

import {
    RESTORE_USER_REQUEST,
    RESTORE_USER_SUCCESS,
    RESTORE_USER_FAILURE
} from 'constants/actionTypes/deletedData';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';

export const restoreUserRequest = () => ({
    type: RESTORE_USER_REQUEST
});

export const restoreUserSuccess = id => ({
    type: RESTORE_USER_SUCCESS,
    id
});

export const restoreUserFailure = error => ({
    type: RESTORE_USER_FAILURE,
    error
});

export default userID => dispatch => {
    dispatch(restoreUserRequest());
    return axios
        .delete(`${API_URL}/users/${userID}?undo=true`, getHeaders())
        .then(() => dispatch(restoreUserSuccess(userID)))
        .catch(err => dispatch(restoreUserFailure(err.message)));
};
