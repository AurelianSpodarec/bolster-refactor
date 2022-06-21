import axios from 'axios';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import {
    ENABLE_JOB_REFERENCE_REQUEST,
    ENABLE_JOB_REFERENCE_SUCCESS,
    ENABLE_JOB_REFERENCE_FAILURE,
} from 'constants/actionTypes/jobReferences';

export const enableJobReferenceRequest = payload => ({
    type: ENABLE_JOB_REFERENCE_REQUEST,
    payload,
});

export const enableJobReferenceSuccess = payload => ({
    type: ENABLE_JOB_REFERENCE_SUCCESS,
    payload,
});

export const enableJobReferenceFailure = (error, payload) => ({
    type: ENABLE_JOB_REFERENCE_FAILURE,
    error,
    payload,
});

export default jobReference => async dispatch => {
    dispatch(enableJobReferenceRequest(jobReference));

    return axios
        .patch(`${API_URL}/jobreference/${jobReference.id}/disable?undo=true`, null, getHeaders())
        .then(res => dispatch(enableJobReferenceSuccess(res.data)))
        .catch(err => dispatch(enableJobReferenceFailure(err.message, jobReference)));
};
