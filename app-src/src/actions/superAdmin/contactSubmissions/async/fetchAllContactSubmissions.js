import axios from 'axios';

import {
    FETCH_ALL_CONTACT_SUBMISSIONS_REQUEST,
    FETCH_ALL_CONTACT_SUBMISSIONS_SUCCESS,
    FETCH_ALL_CONTACT_SUBMISSIONS_FAILURE,
} from 'constants/actionTypes/contactSubmissions';
import { ADMIN_API_URL } from 'config';
import { getHeaders } from 'helpers/api';

export const fetchContactSubmissionsRequest = () => ({
    type: FETCH_ALL_CONTACT_SUBMISSIONS_REQUEST,
});

export const fetchContactSubmissionsSuccess = payload => ({
    type: FETCH_ALL_CONTACT_SUBMISSIONS_SUCCESS,
    payload,
});

export const fetchContactSubmissionsFailure = error => ({
    type: FETCH_ALL_CONTACT_SUBMISSIONS_FAILURE,
    error,
});

export default () => dispatch => {
    dispatch(fetchContactSubmissionsRequest());
    axios
        .get(`${ADMIN_API_URL}/contact`, getHeaders())
        .then(res => dispatch(fetchContactSubmissionsSuccess(res.data)))
        .catch(err => dispatch(fetchContactSubmissionsFailure(err.message)));
};
