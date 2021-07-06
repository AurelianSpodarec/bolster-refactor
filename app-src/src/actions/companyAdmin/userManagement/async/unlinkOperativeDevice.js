import axios from 'axios';

import { API_URL } from 'config/index';
import { getHeaders } from 'helpers/api';
import {
    UNLINK_OPERATIVE_DEVICE_REQUEST,
    UNLINK_OPERATIVE_DEVICE_SUCCESS,
    UNLINK_OPERATIVE_DEVICE_FAILURE,
} from 'constants/actionTypes/usersManagement';

export const unlinkOperativeRequest = () => ({
    type: UNLINK_OPERATIVE_DEVICE_REQUEST,
});

export const unlinkOperativeSuccess = operativeID => ({
    type: UNLINK_OPERATIVE_DEVICE_SUCCESS,
    operativeID,
});

export const unlinkOperativeFailure = error => ({
    type: UNLINK_OPERATIVE_DEVICE_FAILURE,
    error,
});

export default userID => dispatch => {
    dispatch(unlinkOperativeRequest());

    return axios
        .post(`${API_URL}/users/${userID}/unlink`, {}, getHeaders())
        .then(() => dispatch(unlinkOperativeSuccess(userID)))
        .catch(error => dispatch(unlinkOperativeFailure(error)));
};
