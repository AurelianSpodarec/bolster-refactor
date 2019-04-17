import axios from 'axios';

import { API_URL } from 'config';
import {
    FETCH_PENDING_INVITES_REQUEST,
    FETCH_PENDING_INVITES_SUCCESS,
    FETCH_PENDING_INVITES_FAILURE
} from 'constants/actionTypes/pendingInvites';
import { getHeaders } from 'helpers/api';

export const fetchPendingInvitesRequest = () => ({
    type: FETCH_PENDING_INVITES_REQUEST
});

export const fetchPendingInvitesSuccess = payload => ({
    type: FETCH_PENDING_INVITES_SUCCESS,
    payload
});

export const fetchPendingInvitesFailure = error => ({
    type: FETCH_PENDING_INVITES_FAILURE,
    error
});

export default () => dispatch => {
    dispatch(fetchPendingInvitesRequest());

    axios
        .get(`${API_URL}/companypermissions/pendinginvites`, getHeaders())
        .then(({ data }) => dispatch(fetchPendingInvitesSuccess(data)))
        .catch(err => dispatch(fetchPendingInvitesFailure(err.message)));
};
