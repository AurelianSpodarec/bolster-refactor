import axios from 'axios';
import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';

import {
    FETCH_ALL_FAQS_REQUEST,
    FETCH_ALL_FAQS_SUCCESS,
    FETCH_ALL_FAQS_FAILURE,
} from 'constants/actionTypes/faqs';

export const fetchAllFaqsRequest = () => ({
    type: FETCH_ALL_FAQS_REQUEST,
});

export const fetchAllFaqsSuccess = payload => ({
    type: FETCH_ALL_FAQS_SUCCESS,
    payload,
});

export const fetchAllFaqsFailure = error => ({
    type: FETCH_ALL_FAQS_FAILURE,
    error,
});

export default () => dispatch => {
    dispatch(fetchAllFaqsRequest());

    axios
        .get(`${API_URL}/faq/`, getHeaders())
        .then(res => dispatch(fetchAllFaqsSuccess(res.data)))
        .catch(err => dispatch(fetchAllFaqsFailure(err.message)));
};
