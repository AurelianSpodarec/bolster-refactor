import axios from 'axios';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import {
    DELETE_TRANSFER_REQUEST_REQUEST,
    DELETE_TRANSFER_REQUEST_SUCCESS,
    DELETE_TRANSFER_REQUEST_FAILURE
} from 'constants/actionTypes/documents';

export const deleteTransferRequestRequest = () => ({
    type: DELETE_TRANSFER_REQUEST_REQUEST
});

export const deleteTransferRequestSuccess = payload => ({
    type: DELETE_TRANSFER_REQUEST_SUCCESS,
    payload
});

export const deleteTransferRequestFailure = error => ({
    type: DELETE_TRANSFER_REQUEST_FAILURE,
    error
});

export default id => dispatch => {
    dispatch(deleteTransferRequestRequest());
    return axios
        .delete(`${API_URL}/transferrequests/${id}/`, getHeaders())
        .then(({ data }) => dispatch(deleteTransferRequestSuccess(data)))
        .catch(err => dispatch(deleteTransferRequestFailure(err.message)));
};
