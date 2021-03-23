import axios from 'axios';

import { API_URL } from 'config/index';
import { getHeaders } from 'helpers/api';
import {
    UNLINK_OPERATIVE_DEVICE_REQUEST,
    UNLINK_OPERATIVE_DEVICE_SUCCESS,
    UNLINK_OPERATIVE_DEVICE_FAILURE,
} from 'constants/actionTypes/usersManagement';

export const unlinkOperativeDeviceRequest = () => ({
    type: UNLINK_OPERATIVE_DEVICE_REQUEST,
});

export const unlinkOperativeDeviceSuccess = operativeID => ({
    type: UNLINK_OPERATIVE_DEVICE_SUCCESS,
    operativeID,
});

export const unlinkOperativeDeviceFailure = error => ({
    type: UNLINK_OPERATIVE_DEVICE_FAILURE,
    error,
});

export default userID => dispatch => {
    dispatch(unlinkOperativeDeviceRequest());

    return axios
        .post(`${API_URL}/users/${userID}/unlink`, {}, getHeaders())
        .then(({ data }) => dispatch(unlinkOperativeDeviceSuccess(data)))
        .catch(error => dispatch(unlinkOperativeDeviceFailure(error)));
};
