import axios from 'axios';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';

import {
    FETCH_DOCUMENTS_REQUEST,
    FETCH_DOCUMENTS_SUCCESS,
    FETCH_DOCUMENTS_FAILURE
} from 'constants/actionTypes/documents';

export const fetchDocumentsRequest = () => ({
    type: FETCH_DOCUMENTS_REQUEST
});

export const fetchDocumentsSuccess = payload => ({
    type: FETCH_DOCUMENTS_SUCCESS,
    payload
});

export const fetchDocumentsFailure = error => ({
    type: FETCH_DOCUMENTS_FAILURE,
    error
});

//HierarchyType = Site/Building/Floor/Drawing
export default (HierarchyType, ID) => dispatch => {
    dispatch(fetchDocumentsRequest());

    axios
        .get(`${API_URL}/documents/${HierarchyType}/${ID}`, getHeaders())
        .then(res => dispatch(fetchDocumentsSuccess(res.data)))
        .catch(error => {
            dispatch(fetchDocumentsFailure(error.message));
        });
};
