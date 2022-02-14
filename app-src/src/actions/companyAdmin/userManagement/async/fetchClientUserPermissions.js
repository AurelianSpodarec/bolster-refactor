import axios from 'axios';
import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';

import {
    FETCH_CLIENT_USER_PERMISSIONS_REQUEST,
    FETCH_CLIENT_USER_PERMISSIONS_SUCCESS,
    FETCH_CLIENT_USER_PERMISSIONS_FAILURE,
} from 'constants/actionTypes/usersManagement';

export const fetchClientUserPermissionsRequest = () => ({
    type: FETCH_CLIENT_USER_PERMISSIONS_REQUEST,
});

export const fetchClientUserPermissionsSuccess = payload => ({
    type: FETCH_CLIENT_USER_PERMISSIONS_SUCCESS,
    payload,
});

export const fetchClientUserPermissionsFailure = error => ({
    type: FETCH_CLIENT_USER_PERMISSIONS_FAILURE,
    error,
});

export default () => dispatch => {
    dispatch(fetchClientUserPermissionsRequest());

    return axios
        .get(`${API_URL}/clientpermissions`, getHeaders())
        .then(res => dispatch(fetchClientUserPermissionsSuccess(res.data)))
        .catch(error => {
            dispatch(fetchClientUserPermissionsFailure(error.message));
        });
};
