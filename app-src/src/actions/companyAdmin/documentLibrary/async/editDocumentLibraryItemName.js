import axios from 'axios';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import {
    EDIT_DOCUMENT_LIBRARY_ITEM_NAME_REQUEST,
    EDIT_DOCUMENT_LIBRARY_ITEM_NAME_SUCCESS,
    EDIT_DOCUMENT_LIBRARY_ITEM_NAME_FAILURE,
} from 'constants/actionTypes/documentLibrary';

export const editDocumentLibraryItemNameRequest = () => ({
    type: EDIT_DOCUMENT_LIBRARY_ITEM_NAME_REQUEST,
});

export const editDocumentLibraryItemNameSuccess = payload => ({
    type: EDIT_DOCUMENT_LIBRARY_ITEM_NAME_SUCCESS,
    payload,
});

export const editDocumentLibraryItemNameFailure = error => ({
    type: EDIT_DOCUMENT_LIBRARY_ITEM_NAME_FAILURE,
    error,
});

export default (id, postBody) => dispatch => {
    dispatch(editDocumentLibraryItemNameRequest());

    return axios
        .patch(`${API_URL}/document-library/${id}`, postBody, getHeaders())
        .then(res => dispatch(editDocumentLibraryItemNameSuccess(res.data)))
        .catch(err => dispatch(editDocumentLibraryItemNameFailure(err.message)));
};
