import axios from 'axios';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import {
    RESPOND_TO_PENDING_INVITE_REQUEST,
    RESPOND_TO_PENDING_INVITE_SUCCESS,
    RESPOND_TO_PENDING_INVITE_FAILURE
} from 'constants/actionTypes/pendingInvites';

export const respondToPendingInviteRequest = () => ({
    type: RESPOND_TO_PENDING_INVITE_REQUEST
});

export const respondToPendingInviteSuccess = payload => ({
    type: RESPOND_TO_PENDING_INVITE_SUCCESS,
    payload
});

export const respondToPendingInviteFailure = error => ({
    type: RESPOND_TO_PENDING_INVITE_FAILURE,
    error
});

export default (id, postBody) => dispatch => {
    console.log(id, postBody);
    dispatch(respondToPendingInviteRequest());
    return axios
        .post(
            `${API_URL}/companypermissions/${id}/respond`,
            postBody,
            getHeaders()
        )
        .then(({ data }) => dispatch(respondToPendingInviteSuccess(data)))
        .catch(err => dispatch(respondToPendingInviteFailure(err.message)));
};
