import axios from 'axios';

import { getHeaders, handleErrors } from 'helpers/api';
import {
    POST_CONTACT_REQUEST,
    POST_CONTACT_SUCCESS,
    POST_CONTACT_FAILURE
} from 'constants/actionTypes/contact';
import { FRONTEND_API_URL } from 'config';

export const postContactRequest = () => ({
    type: POST_CONTACT_REQUEST
});

export const postContactSuccess = payload => ({
    type: POST_CONTACT_SUCCESS,
    payload
});

export const postContactFailure = error => ({
    type: POST_CONTACT_FAILURE,
    error
});

export default postBody => dispatch => {
    dispatch(postContactRequest());

    return axios
        .post(`${FRONTEND_API_URL}/enquiries/contact`, postBody, getHeaders())
        .then(res => dispatch(postContactSuccess(res.data)))
        .catch(err => dispatch(handleErrors(postContactFailure)(err)));
};
