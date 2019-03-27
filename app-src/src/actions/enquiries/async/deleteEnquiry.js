import axios from 'axios';

import {
    DELETE_ENQUIRY_REQUEST,
    DELETE_ENQUIRY_SUCCESS,
    DELETE_ENQUIRY_FAILURE
} from 'constants/actionTypes/enquiries';
import { ADMIN_API_URL } from 'config';
import { getHeaders } from 'helpers/api';

export const deleteEnquiryRequest = () => ({
    type: DELETE_ENQUIRY_REQUEST
});

export const deleteEnquirySuccess = id => ({
    type: DELETE_ENQUIRY_SUCCESS,
    id
});

export const deleteEnquiryFailure = error => ({
    type: DELETE_ENQUIRY_FAILURE,
    error
});

export default enquiryID => dispatch => {
    dispatch(deleteEnquiryRequest());
    axios
        .delete(`${ADMIN_API_URL}/enquiries/fdtydt${enquiryID}`, getHeaders())
        .then(() => dispatch(deleteEnquirySuccess(enquiryID)))
        .catch(err => dispatch(deleteEnquiryFailure(err.message)));
};
