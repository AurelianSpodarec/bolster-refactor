import axios from 'axios';

import { API_URL } from 'config';
import {
    FETCH_OUTGOING_TRANSFER_REQUESTS_REQUEST,
    FETCH_OUTGOING_TRANSFER_REQUESTS_SUCCESS,
    FETCH_OUTGOING_TRANSFER_REQUESTS_FAILURE
} from 'constants/actionTypes/transferRequests';
import { getHeaders } from 'helpers/api';

export const fetchOutgoingTransferRequestsRequest = () => ({
    type: FETCH_OUTGOING_TRANSFER_REQUESTS_REQUEST
});

export const fetchOutgoingTransferRequestsSuccess = payload => ({
    type: FETCH_OUTGOING_TRANSFER_REQUESTS_SUCCESS,
    payload
});

export const fetchOutgoingTransferRequestsFailure = error => ({
    type: FETCH_OUTGOING_TRANSFER_REQUESTS_FAILURE,
    error
});

export default () => dispatch => {
    dispatch(fetchOutgoingTransferRequestsRequest());

    axios
        .get(`${API_URL}/transferrequests/outgoing`, getHeaders())
        .then(({ data }) =>
            dispatch(fetchOutgoingTransferRequestsSuccess(data))
        )
        .catch(err =>
            dispatch(fetchOutgoingTransferRequestsFailure(err.message))
        );
};
