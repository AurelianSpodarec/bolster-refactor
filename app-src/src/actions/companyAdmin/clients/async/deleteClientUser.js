import axios from 'axios';

import {
    DELETE_CLIENT_USER_REQUEST,
    DELETE_CLIENT_USER_SUCCESS,
    DELETE_CLIENT_USER_FAILURE,
} from 'constants/actionTypes/clients';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';

export const deleteClientUserRequest = () => ({
    type: DELETE_CLIENT_USER_REQUEST,
});

export const deleteClientUserSuccess = id => ({
    type: DELETE_CLIENT_USER_SUCCESS,
    id,
});

export const deleteClientUserFailure = error => ({
    type: DELETE_CLIENT_USER_FAILURE,
    error,
});

export default clientUserID => dispatch => {
    dispatch(deleteClientUserRequest());
    axios
        .delete(`${API_URL}/clientpermissions/clientUsers/${clientUserID}`, getHeaders())
        .then(() => dispatch(deleteClientUserSuccess(clientUserID)))
        .catch(err => dispatch(deleteClientUserFailure(err.message)));
};
