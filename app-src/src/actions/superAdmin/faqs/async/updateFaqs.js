import axios from 'axios';
import { ADMIN_API_URL } from 'config';
import { getHeaders } from 'helpers/api';

import {
    UPDATE_FAQS_REQUEST,
    UPDATE_FAQS_SUCCESS,
    UPDATE_FAQS_FAILURE,
} from 'constants/actionTypes/faqs';

export const updateFaqsRequest = () => ({
    type: UPDATE_FAQS_REQUEST,
});

export const updateFaqsSuccess = payload => ({
    type: UPDATE_FAQS_SUCCESS,
    payload,
});

export const updateFaqsFailure = error => ({
    type: UPDATE_FAQS_FAILURE,
    error,
});

export default postBody => dispatch => {
    dispatch(updateFaqsRequest());

    axios
        .put(`${ADMIN_API_URL}/appHelp/`, postBody, getHeaders())
        .then(res => dispatch(updateFaqsSuccess(res.data)))
        .catch(err => dispatch(updateFaqsFailure(err.message)));
};
