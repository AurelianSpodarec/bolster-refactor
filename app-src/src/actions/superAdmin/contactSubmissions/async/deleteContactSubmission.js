import axios from 'axios';

import {
    DELETE_CONTACT_SUBMISSION_REQUEST,
    DELETE_CONTACT_SUBMISSION_SUCCESS,
    DELETE_CONTACT_SUBMISSION_FAILURE,
} from 'constants/actionTypes/contactSubmissions';
import { ADMIN_API_URL } from 'config';
import { getHeaders } from 'helpers/api';

export const deleteContactSubmissionRequest = () => ({
    type: DELETE_CONTACT_SUBMISSION_REQUEST,
});

export const deleteContactSubmissionSuccess = id => ({
    type: DELETE_CONTACT_SUBMISSION_SUCCESS,
    id,
});

export const deleteContactSubmissionFailure = error => ({
    type: DELETE_CONTACT_SUBMISSION_FAILURE,
    error,
});

export default id => dispatch => {
    dispatch(deleteContactSubmissionRequest());
    axios
        .delete(`${ADMIN_API_URL}/contact/${id}`, getHeaders())
        .then(() => dispatch(deleteContactSubmissionSuccess(id)))
        .catch(err => dispatch(deleteContactSubmissionFailure(err.message)));
};
