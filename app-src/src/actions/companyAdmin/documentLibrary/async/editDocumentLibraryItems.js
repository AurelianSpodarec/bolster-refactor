import axios from 'axios';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import {
    EDIT_DOCUMENT_LIBRARY_ITEMS_REQUEST,
    EDIT_DOCUMENT_LIBRARY_ITEMS_SUCCESS,
    EDIT_DOCUMENT_LIBRARY_ITEMS_FAILURE,
} from 'constants/actionTypes/documentLibrary';

export const editDocumentLibraryItemsRequest = () => ({
    type: EDIT_DOCUMENT_LIBRARY_ITEMS_REQUEST,
});

export const editDocumentLibraryItemsSuccess = payload => ({
    type: EDIT_DOCUMENT_LIBRARY_ITEMS_SUCCESS,
    payload,
});

export const editDocumentLibraryItemsFailure = error => ({
    type: EDIT_DOCUMENT_LIBRARY_ITEMS_FAILURE,
    error,
});

export default postBody => dispatch => {
    dispatch(editDocumentLibraryItemsRequest());

    return axios
        .patch(`${API_URL}/document-library/edit`, postBody, getHeaders())
        .then(res => dispatch(editDocumentLibraryItemsSuccess(res.data)))
        .catch(err => dispatch(editDocumentLibraryItemsFailure(err.message)));
};
