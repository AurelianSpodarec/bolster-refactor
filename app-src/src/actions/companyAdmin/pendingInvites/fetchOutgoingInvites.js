import axios from 'axios';

import { API_URL } from 'config';
import {
    FETCH_OUTGOING_INVITES_REQUEST,
    FETCH_OUTGOING_INVITES_SUCCESS,
    FETCH_OUTGOING_INVITES_FAILURE
} from 'constants/actionTypes/pendingInvites';
import { getHeaders } from 'helpers/api';

export const fetchOutgoingInvitesRequest = () => ({
    type: FETCH_OUTGOING_INVITES_REQUEST
});

export const fetchOutgoingInvitesSuccess = payload => ({
    type: FETCH_OUTGOING_INVITES_SUCCESS,
    payload
});

export const fetchOutgoingInvitesFailure = error => ({
    type: FETCH_OUTGOING_INVITES_FAILURE,
    error
});

export default () => dispatch => {
    dispatch(fetchOutgoingInvitesRequest());

    axios
        .get(`${API_URL}/companypermissions/outgoinginvites`, getHeaders())
        .then(({ data }) => dispatch(fetchOutgoingInvitesSuccess(data)))
        .catch(err => dispatch(fetchOutgoingInvitesFailure(err.message)));
};
