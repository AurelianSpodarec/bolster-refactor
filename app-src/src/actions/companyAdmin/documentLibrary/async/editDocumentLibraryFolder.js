import axios from 'axios';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import {
    EDIT_DOCUMENT_LIBRARY_ITEMS_REQUEST,
    EDIT_DOCUMENT_LIBRARY_ITEMS_SUCCESS,
    EDIT_DOCUMENT_LIBRARY_ITEMS_FAILURE,
} from 'constants/actionTypes/documentLibrary';

export const editDocumentLibraryFolderRequest = () => ({
    type: EDIT_DOCUMENT_LIBRARY_ITEMS_REQUEST,
});

export const editDocumentLibraryFolderSuccess = payload => ({
    type: EDIT_DOCUMENT_LIBRARY_ITEMS_SUCCESS,
    payload,
});

export const editDocumentLibraryFolderFailure = error => ({
    type: EDIT_DOCUMENT_LIBRARY_ITEMS_FAILURE,
    error,
});

export default (postBody) => dispatch => {
    dispatch(editDocumentLibraryFolderRequest());

    return axios
        .patch(`${API_URL}/document-library/edit`, postBody, getHeaders())
        .then(res => dispatch(editDocumentLibraryFolderSuccess(res.data)))
        .catch(err => dispatch(editDocumentLibraryFolderFailure(err.message)));
};
