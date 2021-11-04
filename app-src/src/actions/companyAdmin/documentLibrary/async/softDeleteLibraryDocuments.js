import axios from 'axios';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import {
    SOFT_DELETE_LIBRARY_DOCUMENT_REQUEST,
    SOFT_DELETE_LIBRARY_DOCUMENT_SUCCESS,
    SOFT_DELETE_LIBRARY_DOCUMENT_FAILURE,
} from 'constants/actionTypes/documentLibrary';

export const softDeleteLibraryDocumentsRequest = () => ({
    type: SOFT_DELETE_LIBRARY_DOCUMENT_REQUEST,
});

export const softDeleteLibraryDocumentsSuccess = ids => ({
    type: SOFT_DELETE_LIBRARY_DOCUMENT_SUCCESS,
    ids,
});

export const softDeleteLibraryDocumentsFailure = error => ({
    type: SOFT_DELETE_LIBRARY_DOCUMENT_FAILURE,
    error,
});

export default (ids = []) => dispatch => {
    dispatch(softDeleteLibraryDocumentsRequest());

    return axios
        .patch(`${API_URL}/document-library/archive`, { ids, undo: false }, getHeaders())
        .then(({ data }) => dispatch(softDeleteLibraryDocumentsSuccess(data)))
        .catch(err => dispatch(softDeleteLibraryDocumentsFailure(err.message)));
};
