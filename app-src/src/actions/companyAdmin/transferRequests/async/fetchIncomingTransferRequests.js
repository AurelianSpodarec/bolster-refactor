import axios from 'axios';

import { API_URL } from 'config';
import {
    FETCH_INCOMING_TRANSFER_REQUESTS_REQUEST,
    FETCH_INCOMING_TRANSFER_REQUESTS_SUCCESS,
    FETCH_INCOMING_TRANSFER_REQUESTS_FAILURE
} from 'constants/actionTypes/transferRequests';
import { getHeaders } from 'helpers/api';

export const fetchIncomingTransferRequestsRequest = () => ({
    type: FETCH_INCOMING_TRANSFER_REQUESTS_REQUEST
});

export const fetchIncomingTransferRequestsSuccess = payload => ({
    type: FETCH_INCOMING_TRANSFER_REQUESTS_SUCCESS,
    payload
});

export const fetchIncomingTransferRequestsFailure = error => ({
    type: FETCH_INCOMING_TRANSFER_REQUESTS_FAILURE,
    error
});

export default () => dispatch => {
    dispatch(fetchIncomingTransferRequestsRequest());

    axios
        .get(`${API_URL}/transferrequests/incoming`, getHeaders())
        .then(({ data }) =>
            dispatch(fetchIncomingTransferRequestsSuccess(data))
        )
        .catch(err =>
            dispatch(fetchIncomingTransferRequestsFailure(err.message))
        );
};
