import axios from 'axios';

import {
    FETCH_ALL_ENQUIRIES_REQUEST,
    FETCH_ALL_ENQUIRIES_SUCCESS,
    FETCH_ALL_ENQUIRIES_FAILURE
} from 'constants/actionTypes/enquiries';
import { ADMIN_API_URL } from 'config';
import { getHeaders } from 'helpers/api';

export const fetchEnquiriesRequest = () => ({
    type: FETCH_ALL_ENQUIRIES_REQUEST
});

export const fetchEnquiriesSuccess = payload => ({
    type: FETCH_ALL_ENQUIRIES_SUCCESS,
    payload
});

export const fetchEnquiriesFailure = error => ({
    type: FETCH_ALL_ENQUIRIES_FAILURE,
    error
});

export default () => dispatch => {
    dispatch(fetchEnquiriesRequest());
    axios
        .get(`${ADMIN_API_URL}/enquiries`, getHeaders())
        .then(res => dispatch(fetchEnquiriesSuccess(res.data)))
        .catch(err => dispatch(fetchEnquiriesFailure(err.message)));
};
