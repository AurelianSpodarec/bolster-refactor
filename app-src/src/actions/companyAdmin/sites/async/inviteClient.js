import axios from 'axios';

import { API_URL } from 'config/index';
import setAPIFieldErrors from 'actions/shared/generic/fieldErrors/sync/setAPIFieldErrors';
import { getHeaders } from 'helpers/api';
import {
    INVITE_CLIENT_REQUEST,
    INVITE_CLIENT_SUCCESS,
    INVITE_CLIENT_FAILURE
} from 'constants/actionTypes/clients';

export const inviteClientRequest = () => ({
    type: INVITE_CLIENT_REQUEST
});

export const inviteClientSuccess = payload => ({
    type: INVITE_CLIENT_SUCCESS,
    payload
});

export const inviteClientFailure = error => ({
    type: INVITE_CLIENT_FAILURE,
    error
});

export default (level, levelID, postBody) => dispatch => {
    dispatch(inviteClientRequest());

    axios
        .post(
            `${API_URL}/${level}/${levelID}/invitecompany`,
            postBody,
            getHeaders()
        )
        .then(result => dispatch(inviteClientSuccess(result.data)))
        .catch(error => {
            dispatch(inviteClientFailure(error));
            if (error.response.status === 400)
                dispatch(setAPIFieldErrors(error.response.data.errors));
        });
};
