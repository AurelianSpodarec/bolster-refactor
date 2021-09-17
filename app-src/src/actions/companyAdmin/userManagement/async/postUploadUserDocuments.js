import axios from 'axios';

import {
    POST_UPLOAD_USER_DOCUMENTS_REQUEST,
    POST_UPLOAD_USER_DOCUMENTS_SUCCESS,
    POST_UPLOAD_USER_DOCUMENTS_FAILURE,
} from 'constants/actionTypes/usersManagement';
import { getHeaders } from 'helpers/api';
import { API_URL } from 'config';

export const postUploadUserDocumentsRequest = () => ({
    type: POST_UPLOAD_USER_DOCUMENTS_REQUEST,
});

export const postUploadUserDocumentsSuccess = payload => ({
    type: POST_UPLOAD_USER_DOCUMENTS_SUCCESS,
    payload,
});

export const postUploadUserDocumentsFailure = error => ({
    type: POST_UPLOAD_USER_DOCUMENTS_FAILURE,
    error,
});

export default postBody => dispatch => {
    dispatch(postUploadUserDocumentsRequest());

    return axios
        .post(`${API_URL}/users/documents`, postBody, getHeaders())
        .then(res => dispatch(postUploadUserDocumentsSuccess(res.data)))
        .catch(err => dispatch(postUploadUserDocumentsFailure(err.message)));
};
