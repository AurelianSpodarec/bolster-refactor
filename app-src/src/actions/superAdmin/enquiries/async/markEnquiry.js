import axios from 'axios';

import {
    MARK_ENQUIRY_REQUEST,
    MARK_ENQUIRY_SUCCESS,
    MARK_ENQUIRY_FAILURE,
} from 'constants/actionTypes/enquiries';
import { ADMIN_API_URL } from 'config';
import { getHeaders } from 'helpers/api';

export const markEnquiryRequest = () => ({
    type: MARK_ENQUIRY_REQUEST,
});

export const markEnquirySuccess = data => ({
    type: MARK_ENQUIRY_SUCCESS,
    data,
});

export const markEnquiryFailure = error => ({
    type: MARK_ENQUIRY_FAILURE,
    error,
});

export default (enquiryID, postBody = {}) => dispatch => {
    dispatch(markEnquiryRequest());
    axios
        .patch(`${ADMIN_API_URL}/enquiries/enquiries/${enquiryID}`, postBody, getHeaders())
        .then(({ data }) => dispatch(markEnquirySuccess(data)))
        .catch(err => dispatch(markEnquiryFailure(err.message)));
};
