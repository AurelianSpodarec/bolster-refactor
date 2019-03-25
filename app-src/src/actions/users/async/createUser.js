import axios from 'axios';

import {
    CREATE_USER_REQUEST,
    CREATE_USER_SUCCESS,
    CREATE_USER_FAILURE
} from 'constants/actionTypes/users';

import { ADMIN_API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import setAPIFieldErrors from 'actions/generic/fieldErrors/sync/setAPIFieldErrors';

export const createUserRequest = () => ({
    type: CREATE_USER_REQUEST
});
export const createUserSuccess = payload => ({
    type: CREATE_USER_SUCCESS,
    payload
});
export const createUserFailure = error => ({
    type: CREATE_USER_FAILURE,
    error
});

export default postBody => dispatch => {
    dispatch(createUserRequest());
    return axios
        .post(`${ADMIN_API_URL}/users`, postBody, getHeaders())
        .then(({ data }) => dispatch(createUserSuccess(data)))
        .catch(err => {
            dispatch(createUserFailure(err.message));
            if (err.response.status === 400) {
                dispatch(setAPIFieldErrors(err.response.data.errors));
            }
        });
};
