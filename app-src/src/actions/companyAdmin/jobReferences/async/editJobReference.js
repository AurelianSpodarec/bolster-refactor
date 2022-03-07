import axios from 'axios';

import {
    EDIT_JOB_REFERENCE_REQUEST,
    EDIT_JOB_REFERENCE_SUCCESS,
    EDIT_JOB_REFERENCE_FAILURE,
} from 'constants/actionTypes/jobReferences';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';

export const editJobReferenceRequest = () => ({
    type: EDIT_JOB_REFERENCE_REQUEST,
});

export const editJobReferenceSuccess = payload => ({
    type: EDIT_JOB_REFERENCE_SUCCESS,
    payload,
});

export const editJobReferenceFailure = error => ({
    type: EDIT_JOB_REFERENCE_FAILURE,
    error,
});

export default (id, postBody) => dispatch => {
    dispatch(editJobReferenceRequest());

    return axios
        .patch(`${API_URL}/jobreference/${id}`, postBody, getHeaders())
        .then(res => dispatch(editJobReferenceSuccess(res.data)))
        .catch(err => dispatch(editJobReferenceFailure(err.message)));
};
