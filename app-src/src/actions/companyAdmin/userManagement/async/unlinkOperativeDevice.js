import axios from 'axios';

import { API_URL } from 'config/index';
import { getHeaders } from 'helpers/api';
import {
    UNLINK_OPERATIVE_DEVICE_REQUEST,
    UNLINK_OPERATIVE_DEVICE_SUCCESS,
    UNLINK_OPERATIVE_DEVICE_FAILURE
} from 'constants/actionTypes/usersManagement';

export const editCompanyUserRequest = () => ({
    type: UNLINK_OPERATIVE_DEVICE_REQUEST
});

export const editCompanyUserSuccess = payload => ({
    type: UNLINK_OPERATIVE_DEVICE_SUCCESS,
    payload
});

export const editCompanyUserFailure = error => ({
    type: UNLINK_OPERATIVE_DEVICE_FAILURE,
    error
});

export default (userID, postBody) => dispatch => {
    dispatch(editCompanyUserRequest());

    return axios
        .post(`${API_URL}/users/${userID}/unlink`, postBody, getHeaders())
        .then(({ data }) => dispatch(editCompanyUserSuccess(data)))
        .catch(error => dispatch(editCompanyUserFailure(error)));
};
