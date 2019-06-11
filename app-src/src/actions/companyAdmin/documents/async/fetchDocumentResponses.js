import axios from 'axios';

import {
    FETCH_DOCUMENT_RESPONSES_REQUEST,
    FETCH_DOCUMENT_RESPONSES_SUCCESS,
    FETCH_DOCUMENT_RESPONSES_FAILURE
} from 'constants/actionTypes/documents';
import { getHeaders } from 'helpers/api';
import { API_URL } from 'config';

export const fetchDocumentResponsesRequest = () => ({
    type: FETCH_DOCUMENT_RESPONSES_REQUEST
});

export const fetchDocumentResponsesSuccess = (payload, id) => ({
    type: FETCH_DOCUMENT_RESPONSES_SUCCESS,
    payload,
    id
});

export const fetchDocumentResponsesFailure = error => ({
    type: FETCH_DOCUMENT_RESPONSES_FAILURE,
    error
});

export default documentID => dispatch => {
    dispatch(fetchDocumentResponsesRequest());
    // TODO change url
    axios
        .get(`${API_URL}/document-responses/${documentID}`, getHeaders())
        .then(({ data }) =>
            dispatch(fetchDocumentResponsesSuccess(data, documentID))
        )
        .catch(err => dispatch(fetchDocumentResponsesFailure(err.message)));
};
