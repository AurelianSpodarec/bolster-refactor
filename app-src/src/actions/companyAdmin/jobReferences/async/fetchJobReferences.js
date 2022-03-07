import axios from 'axios';

import {
    FETCH_JOB_REFERENCES_REQUEST,
    FETCH_JOB_REFERENCES_SUCCESS,
    FETCH_JOB_REFERENCES_FAILURE,
} from 'constants/actionTypes/jobReferences';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';

export const fetchJobReferencesRequest = () => ({
    type: FETCH_JOB_REFERENCES_REQUEST,
});

export const fetchJobReferencesSuccess = payload => ({
    type: FETCH_JOB_REFERENCES_SUCCESS,
    payload,
});

export const fetchJobReferencesFailure = error => ({
    type: FETCH_JOB_REFERENCES_FAILURE,
    error,
});

export default () => dispatch => {
    dispatch(fetchJobReferencesRequest());

    return axios
        .get(`${API_URL}/jobreference`, getHeaders())
        .then(res => dispatch(fetchJobReferencesSuccess(res.data)))
        .catch(err => dispatch(fetchJobReferencesFailure(err.message)));
};
