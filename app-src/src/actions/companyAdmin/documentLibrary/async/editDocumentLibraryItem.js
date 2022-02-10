import axios from 'axios';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import {
    EDIT_DOCUMENT_LIBRARY_ITEM_NAME_REQUEST,
    EDIT_DOCUMENT_LIBRARY_ITEM_NAME_SUCCESS,
    EDIT_DOCUMENT_LIBRARY_ITEM_NAME_FAILURE,
} from 'constants/actionTypes/documentLibrary';

export const editDocumentLibraryItemRequest = () => ({
    type: EDIT_DOCUMENT_LIBRARY_ITEM_NAME_REQUEST,
});

export const editDocumentLibraryItemSuccess = payload => ({
    type: EDIT_DOCUMENT_LIBRARY_ITEM_NAME_SUCCESS,
    payload,
});

export const editDocumentLibraryItemFailure = error => ({
    type: EDIT_DOCUMENT_LIBRARY_ITEM_NAME_FAILURE,
    error,
});

export default (id, postBody, isCurrentFolder = false) =>
    dispatch => {
        dispatch(editDocumentLibraryItemRequest());

        return axios
            .patch(`${API_URL}/document-library/${id}`, postBody, getHeaders())
            .then(res => dispatch(editDocumentLibraryItemSuccess({ ...res.data, isCurrentFolder })))
            .catch(err => dispatch(editDocumentLibraryItemFailure(err.message)));
    };
