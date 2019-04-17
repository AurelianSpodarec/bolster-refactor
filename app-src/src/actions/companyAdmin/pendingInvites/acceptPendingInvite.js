import axios from 'axios';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import {
    ACCEPT_PENDING_INVITE_REQUEST,
    ACCEPT_PENDING_INVITE_SUCCESS,
    ACCEPT_PENDING_INVITE_FAILURE
} from 'constants/actionTypes/pendingInvites';

export const respondToRequestRequest = () => ({
    type: ACCEPT_PENDING_INVITE_REQUEST
});

export const respondToRequestSuccess = payload => ({
    type: ACCEPT_PENDING_INVITE_SUCCESS,
    payload
});

export const respondToRequestFailure = error => ({
    type: ACCEPT_PENDING_INVITE_FAILURE,
    error
});

export default postBody => dispatch => {
    dispatch(respondToRequestRequest());
    return axios
        .post(`${API_URL}/companypermissions/accept`, postBody, getHeaders())
        .then(({ data }) => dispatch(respondToRequestSuccess(data)))
        .catch(err => dispatch(respondToRequestFailure(err.message)));
};
