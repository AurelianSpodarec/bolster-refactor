import axios from 'axios';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import setAPIFieldErrors from 'actions/shared/generic/fieldErrors/sync/setAPIFieldErrors';
import {
    EDIT_CLIENT_REQUEST,
    EDIT_CLIENT_SUCCESS,
    EDIT_CLIENT_FAILURE,
} from 'constants/actionTypes/clients';

export const editClientRequest = () => ({
    type: EDIT_CLIENT_REQUEST,
});

export const editClientSuccess = payload => ({
    type: EDIT_CLIENT_SUCCESS,
    payload,
});

export const editClientFailure = error => ({
    type: EDIT_CLIENT_FAILURE,
    error,
});

export default (clientUserID, postBody) => dispatch => {
    dispatch(editClientRequest());
    return axios
        .patch(`${API_URL}/clientpermissions/clientusers/${clientUserID}`, postBody, getHeaders())
        .then(res => dispatch(editClientSuccess(res.data)))
        .catch(err => {
            dispatch(editClientFailure(err.message));
            if (err.response.status === 400) {
                dispatch(setAPIFieldErrors(err.response.data.errors));
            }
        });
};
