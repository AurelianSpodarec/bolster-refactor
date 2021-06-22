import axios from 'axios';
import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';

import {
    FETCH_CLIENT_USER_WITH_PERMISSIONS_REQUEST,
    FETCH_CLIENT_USER_WITH_PERMISSIONS_SUCCESS,
    FETCH_CLIENT_USER_WITH_PERMISSIONS_FAILURE,
} from 'constants/actionTypes/usersManagement';

export const fetchClientUserWithPermissionsRequest = () => ({
    type: FETCH_CLIENT_USER_WITH_PERMISSIONS_REQUEST,
});

export const fetchClientUserWithPermissionsSuccess = payload => ({
    type: FETCH_CLIENT_USER_WITH_PERMISSIONS_SUCCESS,
    payload,
});

export const fetchClientUserWithPermissionsFailure = error => ({
    type: FETCH_CLIENT_USER_WITH_PERMISSIONS_FAILURE,
    error,
});

export default clientUserID => dispatch => {
    dispatch(fetchClientUserWithPermissionsRequest());

    return axios
        .get(`${API_URL}/clientpermissions/clientUsers/${clientUserID}`, getHeaders())
        .then(res => dispatch(fetchClientUserWithPermissionsSuccess(res.data)))
        .catch(error => {
            dispatch(fetchClientUserWithPermissionsFailure(error.message));
        });
};
