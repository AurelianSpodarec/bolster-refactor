import axios from 'axios';

import { API_URL } from 'config/index';
import setAPIFieldErrors from 'actions/shared/generic/fieldErrors/sync/setAPIFieldErrors';
import { getHeaders } from 'helpers/api';
import {
    EDIT_CLIENT_EMAIL_REQUEST,
    EDIT_CLIENT_EMAIL_SUCCESS,
    EDIT_CLIENT_EMAIL_FAILURE,
} from 'constants/actionTypes/clients';

export const editClientUserEmailRequest = () => ({
    type: EDIT_CLIENT_EMAIL_REQUEST,
});

export const editClientUserEmailSuccess = payload => ({
    type: EDIT_CLIENT_EMAIL_SUCCESS,
    payload,
});

export const editClientUserEmailFailure = error => ({
    type: EDIT_CLIENT_EMAIL_FAILURE,
    error,
});

export default (clientUserID, postBody) => dispatch => {
    dispatch(editClientUserEmailRequest());

    return axios
        .post(
            `${API_URL}/clientpermissions/clientusers/${clientUserID}/email`,
            postBody,
            getHeaders(),
        )
        .then(result => dispatch(editClientUserEmailSuccess(result.data)))
        .catch(error => {
            dispatch(editClientUserEmailFailure(error));
            if (error.response.status === 400)
                dispatch(setAPIFieldErrors(error.response.data.errors));
        });
};
