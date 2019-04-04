import axios from 'axios';

import {
    DELETE_DOCUMENT_REQUEST,
    DELETE_DOCUMENT_SUCCESS,
    DELETE_DOCUMENT_FAILURE
} from 'constants/actionTypes/documents';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';

export const deleteDocumentRequest = () => ({
    type: DELETE_DOCUMENT_REQUEST
});

export const deleteDocumentSuccess = id => ({
    type: DELETE_DOCUMENT_SUCCESS,
    id
});

export const deleteDocumentFailure = error => ({
    type: DELETE_DOCUMENT_FAILURE,
    error
});

export default documentID => dispatch => {
    dispatch(deleteDocumentRequest());
    axios
        .delete(`${API_URL}/documents/${documentID}`, getHeaders())
        .then(() => dispatch(deleteDocumentSuccess(documentID)))
        .catch(err => dispatch(deleteDocumentFailure(err.message)));
};
