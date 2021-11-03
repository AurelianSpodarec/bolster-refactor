import axios from 'axios';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import {
    HARD_DELETE_LIBRARY_DOCUMENT_REQUEST,
    HARD_DELETE_LIBRARY_DOCUMENT_SUCCESS,
    HARD_DELETE_LIBRARY_DOCUMENT_FAILURE,
} from 'constants/actionTypes/documentLibrary';

export const hardDeleteLibraryDocumentsRequest = () => ({
    type: HARD_DELETE_LIBRARY_DOCUMENT_REQUEST,
});

export const hardDeleteLibraryDocumentsSuccess = ids => ({
    type: HARD_DELETE_LIBRARY_DOCUMENT_SUCCESS,
    ids,
});

export const hardDeleteLibraryDocumentsFailure = error => ({
    type: HARD_DELETE_LIBRARY_DOCUMENT_FAILURE,
    error,
});

export default (ids = []) => dispatch => {
    dispatch(hardDeleteLibraryDocumentsRequest());

    return axios
        .patch(`${API_URL}/document-library/delete`, { ids }, getHeaders())
        .then(res => dispatch(hardDeleteLibraryDocumentsSuccess(ids)))
        .catch(err => dispatch(hardDeleteLibraryDocumentsFailure(err.message)));
};
