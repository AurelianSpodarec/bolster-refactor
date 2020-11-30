import axios from 'axios';

import {
    MARK_CONTACT_SUBMISSION_REQUEST,
    MARK_CONTACT_SUBMISSION_SUCCESS,
    MARK_CONTACT_SUBMISSION_FAILURE,
} from 'constants/actionTypes/contactSubmissions';
import { ADMIN_API_URL } from 'config';
import { getHeaders } from 'helpers/api';

export const markContactSubmissionsRequest = () => ({
    type: MARK_CONTACT_SUBMISSION_REQUEST,
});

export const markContactSubmissionsSuccess = data => ({
    type: MARK_CONTACT_SUBMISSION_SUCCESS,
    data,
});

export const markContactSubmissionsFailure = error => ({
    type: MARK_CONTACT_SUBMISSION_FAILURE,
    error,
});

export default (enquiryID, postBody = {}) => dispatch => {
    dispatch(markContactSubmissionsRequest());
    axios
        .patch(`${ADMIN_API_URL}/contact/${enquiryID}`, postBody, getHeaders())
        .then(({ data }) => dispatch(markContactSubmissionsSuccess(data)))
        .catch(err => dispatch(markContactSubmissionsFailure(err.message)));
};
