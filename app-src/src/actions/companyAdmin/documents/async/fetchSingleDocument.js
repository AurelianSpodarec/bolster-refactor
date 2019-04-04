import axios from 'axios';

import { API_URL } from 'config/index';
import { getHeaders } from 'helpers/api';

import {
    FETCH_SINGLE_DOCUMENT_REQUEST,
    FETCH_SINGLE_DOCUMENT_SUCCESS,
    FETCH_SINGLE_DOCUMENT_FAILURE
} from 'constants/actionTypes/documents';

export const fetchDocumentRequest = () => ({
    type: FETCH_SINGLE_DOCUMENT_REQUEST
});

export const fetchDocumentSuccess = payload => ({
    type: FETCH_SINGLE_DOCUMENT_SUCCESS,
    payload
});

export const fetchDocumentFailure = error => ({
    type: FETCH_SINGLE_DOCUMENT_FAILURE,
    error
});

//HierarchyType = Site/Building/Floor/Drawing
export default ID => dispatch => {
    dispatch(fetchDocumentRequest());

    axios
        .get(`${API_URL}/documents/${ID}`, getHeaders())
        .then(res => dispatch(fetchDocumentSuccess(res.data)))
        .catch(error => dispatch(fetchDocumentFailure(error.message)));
};
