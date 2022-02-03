import axios from 'axios';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import {
    CREATE_LIBRARY_DOCUMENT_FOLDER_REQUEST,
    CREATE_LIBRARY_DOCUMENT_FOLDER_SUCCESS,
    CREATE_LIBRARY_DOCUMENT_FOLDER_FAILURE,
} from 'constants/actionTypes/documentLibrary';

export const createDocumentLibraryFolderRequest = () => ({
    type: CREATE_LIBRARY_DOCUMENT_FOLDER_REQUEST,
});

export const createDocumentLibraryFolderSuccess = payload => ({
    type: CREATE_LIBRARY_DOCUMENT_FOLDER_SUCCESS,
    payload,
});

export const createDocumentLibraryFolderFailure = error => ({
    type: CREATE_LIBRARY_DOCUMENT_FOLDER_FAILURE,
    error,
});

export default postbody => dispatch => {
    dispatch(createDocumentLibraryFolderRequest());

    return axios
        .post(`${API_URL}/document-library/folder`, postbody, getHeaders())
        .then(res => dispatch(createDocumentLibraryFolderSuccess(res.data)))
        .catch(err => dispatch(createDocumentLibraryFolderFailure(err.message)));
};
