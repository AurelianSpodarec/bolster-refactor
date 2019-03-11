import axios from 'axios';

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

export default () => dispatch => {
    dispatch(fetchDocumentsRequest());

    axios
        .get('/mockData/documents/documents.json')
        .then(res => dispatch(fetchDocumentsSuccess(res.data)))
        .catch(err => dispatch(fetchDocumentsFailure(err.message)));
};
