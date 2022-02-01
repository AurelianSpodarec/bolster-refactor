import axios from 'axios';
import { ADMIN_API_URL } from 'config';
import { getHeaders } from 'helpers/api';

import {
    CREATE_FAQS_REQUEST,
    CREATE_FAQS_SUCCESS,
    CREATE_FAQS_FAILURE,
} from 'constants/actionTypes/faqs';

export const createFaqsRequest = () => ({
    type: CREATE_FAQS_REQUEST,
});

export const createFaqsSuccess = payload => ({
    type: CREATE_FAQS_SUCCESS,
    payload,
});

export const createFaqsFailure = error => ({
    type: CREATE_FAQS_FAILURE,
    error,
});

export default postBody => dispatch => {
    dispatch(createFaqsRequest());

    axios
        .post(`${ADMIN_API_URL}/faq/`, { ...postBody }, getHeaders())
        .then(res => dispatch(createFaqsSuccess(res.data)))
        .catch(err => dispatch(createFaqsFailure(err.message)));
};
