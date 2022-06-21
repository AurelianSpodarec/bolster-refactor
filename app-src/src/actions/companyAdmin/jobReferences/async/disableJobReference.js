import axios from 'axios';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import {
    DISABLE_JOB_REFERENCE_REQUEST,
    DISABLE_JOB_REFERENCE_SUCCESS,
    DISABLE_JOB_REFERENCE_FAILURE,
} from 'constants/actionTypes/jobReferences';

export const disableJobReferenceRequest = payload => ({
    type: DISABLE_JOB_REFERENCE_REQUEST,
    payload,
});

export const disableJobReferenceSuccess = payload => ({
    type: DISABLE_JOB_REFERENCE_SUCCESS,
    payload,
});

export const disableJobReferenceFailure = (error, payload) => ({
    type: DISABLE_JOB_REFERENCE_FAILURE,
    error,
    payload,
});

export default jobReference => async dispatch => {
    dispatch(disableJobReferenceRequest(jobReference));

    return axios
        .patch(`${API_URL}/jobreference/${jobReference.id}/disable`, null, getHeaders())
        .then(res => dispatch(disableJobReferenceSuccess(res.data)))
        .catch(err => dispatch(disableJobReferenceFailure(err.message, jobReference)));
};
