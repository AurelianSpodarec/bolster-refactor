import axios from 'axios';

import {
    DISABLE_CLIENT_USER_REQUEST,
    DISABLE_CLIENT_USER_SUCCESS,
    DISABLE_CLIENT_USER_FAILURE,
} from 'constants/actionTypes/clients';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';

export const disableClientUserRequest = () => ({
    type: DISABLE_CLIENT_USER_REQUEST,
});

export const disableClientUserSuccess = payload => ({
    type: DISABLE_CLIENT_USER_SUCCESS,
    payload,
});

export const disableClientUserFailure = error => ({
    type: DISABLE_CLIENT_USER_FAILURE,
    error,
});

export default (clientUserID, undo = false) => dispatch => {
    dispatch(disableClientUserRequest());
    axios
        .post(
            `${API_URL}/clientpermissions/clientUsers/${clientUserID}/disable?undo=${undo}`,
            {},
            getHeaders(),
        )
        .then(({ data }) => dispatch(disableClientUserSuccess(data)))
        .catch(err => dispatch(disableClientUserFailure(err.message)));
};
