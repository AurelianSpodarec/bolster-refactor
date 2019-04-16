import axios from 'axios';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import {
    RESPOND_TO_REQUEST_REQUEST,
    RESPOND_TO_REQUEST_SUCCESS,
    RESPOND_TO_REQUEST_FAILURE
} from 'constants/actionTypes/documents';

export const respondToRequestRequest = () => ({
    type: RESPOND_TO_REQUEST_REQUEST
});

export const respondToRequestSuccess = payload => ({
    type: RESPOND_TO_REQUEST_SUCCESS,
    payload
});

export const respondToRequestFailure = error => ({
    type: RESPOND_TO_REQUEST_FAILURE,
    error
});

export default (id, postBody) => dispatch => {
    dispatch(respondToRequestRequest());
    return axios
        .post(
            `${API_URL}/transferrequests/${id}/respond`,
            postBody,
            getHeaders()
        )
        .then(({ data }) => dispatch(respondToRequestSuccess(data)))
        .catch(err => dispatch(respondToRequestFailure(err.message)));
};
