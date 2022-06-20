import axios from 'axios';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import {
    ENABLE_JOB_REFERENCES_REQUEST,
    ENABLE_JOB_REFERENCES_SUCCESS,
    ENABLE_JOB_REFERENCES_FAILURE,
} from 'constants/actionTypes/jobReferences';

export const enableJobReferencesRequest = payload => ({
    type: ENABLE_JOB_REFERENCES_REQUEST,
    payload,
});

export const enableJobReferencesSuccess = payload => ({
    type: ENABLE_JOB_REFERENCES_SUCCESS,
    payload,
});

export const enableJobReferencesFailure = (error, payload) => ({
    type: ENABLE_JOB_REFERENCES_FAILURE,
    error,
    payload,
});

export default jobReference => async dispatch => {
    dispatch(enableJobReferencesRequest(jobReference));

    return axios
        .patch(`${API_URL}/jobreference/${jobReference.id}/disable?undo=true`, null, getHeaders())
        .then(res => dispatch(enableJobReferencesSuccess(res.data)))
        .catch(err => dispatch(enableJobReferencesFailure(err.message, jobReference)));
};
