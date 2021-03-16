import axios from 'axios';

import {
    POST_LEGAL_DOCUMENT_REQUEST,
    POST_LEGAL_DOCUMENT_SUCCESS,
    POST_LEGAL_DOCUMENT_FAILURE,
} from 'constants/actionTypes/legalDocuments';
import { ADMIN_API_URL } from 'config';
import { getHeaders } from 'helpers/api';

export const postLegalDocumentRequest = () => ({
    type: POST_LEGAL_DOCUMENT_REQUEST,
});

export const postLegalDocumentSuccess = payload => ({
    type: POST_LEGAL_DOCUMENT_SUCCESS,
    payload,
});

export const postLegalDocumentFailure = error => ({
    type: POST_LEGAL_DOCUMENT_FAILURE,
    error,
});

export default postBody => dispatch => {
    dispatch(postLegalDocumentRequest());

    return axios
        .post(`${ADMIN_API_URL}/legal-documents`, postBody, getHeaders())
        .then(res => dispatch(postLegalDocumentSuccess(res.data)))
        .catch(err => dispatch(postLegalDocumentFailure(err.message)));
};
