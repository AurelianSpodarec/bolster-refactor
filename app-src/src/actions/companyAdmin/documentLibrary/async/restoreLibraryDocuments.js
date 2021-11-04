import axios from 'axios';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import {
    RESTORE_LIBRARY_DOCUMENT_REQUEST,
    RESTORE_LIBRARY_DOCUMENT_SUCCESS,
    RESTORE_LIBRARY_DOCUMENT_FAILURE,
} from 'constants/actionTypes/documentLibrary';

export const restoreLibraryDocumentsRequest = () => ({
    type: RESTORE_LIBRARY_DOCUMENT_REQUEST,
});

export const restoreLibraryDocumentsSuccess = payload => ({
    type: RESTORE_LIBRARY_DOCUMENT_SUCCESS,
    payload,
});

export const restoreLibraryDocumentsFailure = error => ({
    type: RESTORE_LIBRARY_DOCUMENT_FAILURE,
    error,
});

export default (ids = []) => dispatch => {
    dispatch(restoreLibraryDocumentsRequest());

    return axios
        .patch(`${API_URL}/document-library/archive`, { ids, undo: true }, getHeaders())
        .then(({ data }) => dispatch(restoreLibraryDocumentsSuccess(data)))
        .catch(err => dispatch(restoreLibraryDocumentsFailure(err.message)));
};
