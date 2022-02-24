import axios from 'axios';

import {
    CREATE_JOB_REFERENCE_REQUEST,
    CREATE_JOB_REFERENCE_SUCCESS,
    CREATE_JOB_REFERENCE_FAILURE,
} from 'constants/actionTypes/jobReferences';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';

export const createJobReferenceRequest = () => ({
    type: CREATE_JOB_REFERENCE_REQUEST,
});

export const createJobReferenceSuccess = payload => ({
    type: CREATE_JOB_REFERENCE_SUCCESS,
    payload,
});

export const createJobReferenceFailure = error => ({
    type: CREATE_JOB_REFERENCE_FAILURE,
    error,
});

export default postBody => dispatch => {
    dispatch(createJobReferenceRequest());

    return axios
        .post(`${API_URL}/jobreference`, postBody, getHeaders())
        .then(res => dispatch(createJobReferenceSuccess(res.data)))
        .catch(err => dispatch(createJobReferenceFailure(err.message)));
};
