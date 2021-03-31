import axios from 'axios';

import { API_URL } from 'config';
import { getHeaders, handleErrors } from 'helpers/api';
import {
    ADD_CLIENT_USER_REQUEST,
    ADD_CLIENT_USER_SUCCESS,
    ADD_CLIENT_USER_FAILURE,
} from 'constants/actionTypes/clients';

export const addClientUserRequest = () => ({
    type: ADD_CLIENT_USER_REQUEST,
});

export const addClientUserSuccess = payload => ({
    type: ADD_CLIENT_USER_SUCCESS,
    payload,
});

export const addClientUserFailure = error => ({
    type: ADD_CLIENT_USER_FAILURE,
    error,
});

export default postBody => dispatch => {
    dispatch(addClientUserRequest());
    return axios
        .post(`${API_URL}/clientpermissions/clientusers`, postBody, getHeaders())
        .then(({ data }) => dispatch(addClientUserSuccess(data)))
        .catch(err => dispatch(handleErrors(addClientUserFailure)(err)));
};
