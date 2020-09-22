import axios from 'axios';

import {
    FETCH_SINGLE_CONTACT_SUBMISSION_REQUEST,
    FETCH_SINGLE_CONTACT_SUBMISSION_SUCCESS,
    FETCH_SINGLE_CONTACT_SUBMISSION_FAILURE,
} from 'constants/actionTypes/contactSubmissions';
import { ADMIN_API_URL } from 'config';
import { getHeaders } from 'helpers/api';

export const fetchContactSubmissionRequest = () => ({
    type: FETCH_SINGLE_CONTACT_SUBMISSION_REQUEST,
});

export const fetchContactSubmissionSuccess = payload => ({
    type: FETCH_SINGLE_CONTACT_SUBMISSION_SUCCESS,
    payload,
    id: payload.id,
});

export const fetchContactSubmissionFailure = error => ({
    type: FETCH_SINGLE_CONTACT_SUBMISSION_FAILURE,
    error,
});

export default id => dispatch => {
    dispatch(fetchContactSubmissionRequest());
    axios
        .get(`${ADMIN_API_URL}/contact/${id}`, getHeaders())
        .then(res => dispatch(fetchContactSubmissionSuccess(res.data)))
        .catch(err => dispatch(fetchContactSubmissionFailure(err.message)));
};
