import axios from 'axios';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import {
    SEARCH_ALL_LIBRARY_DOCUMENTS_REQUEST,
    SEARCH_ALL_LIBRARY_DOCUMENTS_SUCCESS,
    SEARCH_ALL_LIBRARY_DOCUMENTS_FAILURE,
} from 'constants/actionTypes/documentLibrary';

export const searchAllLibraryDocumentsRequest = () => ({
    type: SEARCH_ALL_LIBRARY_DOCUMENTS_REQUEST,
});

export const searchAllLibraryDocumentsSuccess = payload => ({
    type: SEARCH_ALL_LIBRARY_DOCUMENTS_SUCCESS,
    payload,
});

export const searchAllLibraryDocumentsFailure = error => ({
    type: SEARCH_ALL_LIBRARY_DOCUMENTS_FAILURE,
    error,
});

export default (page = 1, limit = 50, s3Key) => dispatch => {
    const queryString = `?${s3Key ? `s3Key=${s3Key}` : ''}page=${page}&pageSize=${limit}`;
    dispatch(searchAllLibraryDocumentsRequest());

    return axios
        .get(`${API_URL}/document-library${queryString}`, getHeaders())
        .then(res => dispatch(searchAllLibraryDocumentsSuccess(res.data)))
        .catch(err => dispatch(searchAllLibraryDocumentsFailure(err.message)));
};
