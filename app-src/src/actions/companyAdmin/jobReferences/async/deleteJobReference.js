import axios from 'axios';

import {
    DELETE_JOB_REFERENCE_REQUEST,
    DELETE_JOB_REFERENCE_SUCCESS,
    DELETE_JOB_REFERENCE_FAILURE,
} from 'constants/actionTypes/jobReferences';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';

export const deleteJobReferenceRequest = () => ({
    type: DELETE_JOB_REFERENCE_REQUEST,
});

export const deleteJobReferenceSuccess = id => ({
    type: DELETE_JOB_REFERENCE_SUCCESS,
    id,
});

export const deleteJobReferenceFailure = error => ({
    type: DELETE_JOB_REFERENCE_FAILURE,
    error,
});

export default id => dispatch => {
    dispatch(deleteJobReferenceRequest());

    return axios
        .delete(`${API_URL}/jobreference/${id}`, getHeaders())
        .then(() => dispatch(deleteJobReferenceSuccess(id)))
        .catch(err => dispatch(deleteJobReferenceFailure(err.message)));
};
