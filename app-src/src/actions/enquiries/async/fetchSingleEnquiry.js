import axios from 'axios';

import {
    FETCH_ENQUIRY_REQUEST,
    FETCH_ENQUIRY_SUCCESS,
    FETCH_ENQUIRY_FAILURE
} from 'constants/actionTypes/enquiries';
import { ADMIN_API_URL } from 'config';
import { getHeaders } from 'helpers/api';

export const fetchEnquiryRequest = () => ({
    type: FETCH_ENQUIRY_REQUEST
});

export const fetchEnquirySuccess = payload => ({
    type: FETCH_ENQUIRY_SUCCESS,
    payload,
    id: payload.id
});

export const fetchEnquiryFailure = error => ({
    type: FETCH_ENQUIRY_FAILURE,
    error
});

export default id => dispatch => {
    dispatch(fetchEnquiryRequest());
    axios
        .get(`${ADMIN_API_URL}/enquiries/${id}`, getHeaders())
        .then(res => dispatch(fetchEnquirySuccess(res.data)))
        .catch(err => dispatch(fetchEnquiryFailure(err.message)));
};
