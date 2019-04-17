import axios from 'axios';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import {
    DELETE_OUTGOING_INVITE_REQUEST,
    DELETE_OUTGOING_INVITE_SUCCESS,
    DELETE_OUTGOING_INVITE_FAILURE
} from 'constants/actionTypes/pendingInvites';

export const deleteOutgoingInviteRequest = () => ({
    type: DELETE_OUTGOING_INVITE_REQUEST
});

export const deleteOutgoingInviteSuccess = payload => ({
    type: DELETE_OUTGOING_INVITE_SUCCESS,
    payload
});

export const deleteOutgoingInviteFailure = error => ({
    type: DELETE_OUTGOING_INVITE_FAILURE,
    error
});

export default id => dispatch => {
    dispatch(deleteOutgoingInviteRequest());
    return axios
        .delete(`${API_URL}/companypermissions/${id}/`, getHeaders())
        .then(({ data }) => dispatch(deleteOutgoingInviteSuccess(data)))
        .catch(err => dispatch(deleteOutgoingInviteFailure(err.message)));
};
