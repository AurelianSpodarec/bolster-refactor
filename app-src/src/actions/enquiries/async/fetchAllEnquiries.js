import axios from 'axios';

import {
    FETCH_ALL_ENQUIRIES_REQUEST,
    FETCH_ALL_ENQUIRIES_SUCCESS,
    FETCH_ALL_ENQUIRIES_FAILURE
} from 'constants/actionTypes/enquiries';

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
        .get('/mockData/enquiries/enquiries.json')
        .then(res => dispatch(fetchEnquiriesSuccess(res.data)))
        .catch(err => dispatch(fetchEnquiriesFailure(err.message)));
};
