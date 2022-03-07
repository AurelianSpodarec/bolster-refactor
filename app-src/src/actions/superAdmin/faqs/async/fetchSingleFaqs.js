import axios from 'axios';
import { ADMIN_API_URL } from 'config';
import { getHeaders } from 'helpers/api';

import {
    FETCH_SINGLE_FAQS_REQUEST,
    FETCH_SINGLE_FAQS_SUCCESS,
    FETCH_SINGLE_FAQS_FAILURE,
} from 'constants/actionTypes/faqs';

export const fetchSingleFaqsRequest = () => ({
    type: FETCH_SINGLE_FAQS_REQUEST,
});

export const fetchSingleFaqsSuccess = payload => ({
    type: FETCH_SINGLE_FAQS_SUCCESS,
    payload,
});

export const fetchSingleFaqsFailure = error => ({
    type: FETCH_SINGLE_FAQS_FAILURE,
    error,
});

export default id => dispatch => {
    dispatch(fetchSingleFaqsRequest());

    axios
        .get(`${ADMIN_API_URL}/appHelp/${id}`, getHeaders())
        .then(res => dispatch(fetchSingleFaqsSuccess(res.data)))
        .catch(err => dispatch(fetchSingleFaqsFailure(err.message)));
};
