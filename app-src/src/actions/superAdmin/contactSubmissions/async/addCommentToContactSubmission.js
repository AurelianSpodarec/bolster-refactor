import axios from 'axios';

import {
    ADD_CONTACT_SUBMISSION_COMMENT_REQUEST,
    ADD_CONTACT_SUBMISSION_COMMENT_SUCCESS,
    ADD_CONTACT_SUBMISSION_COMMENT_FAILURE,
} from 'constants/actionTypes/contactSubmissions';
import { ADMIN_API_URL } from 'config';
import { getHeaders } from 'helpers/api';

export const addContactSubmissionCommentRequest = () => ({
    type: ADD_CONTACT_SUBMISSION_COMMENT_REQUEST,
});

export const addContactSubmissionCommentSuccess = data => ({
    type: ADD_CONTACT_SUBMISSION_COMMENT_SUCCESS,
    data,
});

export const addContactSubmissionCommentFailure = error => ({
    type: ADD_CONTACT_SUBMISSION_COMMENT_FAILURE,
    error,
});

export default (id, comments) => dispatch => {
    dispatch(addContactSubmissionCommentRequest());
    return axios
        .post(`${ADMIN_API_URL}/contact/${id}`, { Comments: comments }, getHeaders())
        .then(({ data }) => dispatch(addContactSubmissionCommentSuccess(data)))
        .catch(err => dispatch(addContactSubmissionCommentFailure(err.message)));
};
