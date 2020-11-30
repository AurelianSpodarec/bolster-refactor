import axios from 'axios';

import {
    UPDATE_LEGAL_DOCUMENT_REQUEST,
    UPDATE_LEGAL_DOCUMENT_SUCCESS,
    UPDATE_LEGAL_DOCUMENT_FAILURE,
} from 'constants/actionTypes/legalDocuments';
import { ADMIN_API_URL } from 'config';
import { getHeaders } from 'helpers/api';

export const updateLegalDocumentRequest = () => ({
    type: UPDATE_LEGAL_DOCUMENT_REQUEST,
});

export const updateLegalDocumentSuccess = payload => ({
    type: UPDATE_LEGAL_DOCUMENT_SUCCESS,
    payload,
});

export const updateLegalDocumentFailure = error => ({
    type: UPDATE_LEGAL_DOCUMENT_FAILURE,
    error,
});

export default (id, postBody) => dispatch => {
    dispatch(updateLegalDocumentRequest());

    return axios
        .put(`${ADMIN_API_URL}/legal-documents/${id}`, postBody, getHeaders())
        .then(res => dispatch(updateLegalDocumentSuccess(res.data)))
        .catch(err => dispatch(updateLegalDocumentFailure(err.message)));
};
