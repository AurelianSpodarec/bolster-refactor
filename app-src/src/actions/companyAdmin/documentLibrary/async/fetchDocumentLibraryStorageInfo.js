import axios from 'axios';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import {
    FETCH_STORAGE_INFORMATION_REQUEST,
    FETCH_STORAGE_INFORMATION_SUCCESS,
    FETCH_STORAGE_INFORMATION_FAILURE,
} from 'constants/actionTypes/documentLibrary';

export const fetchDocumentLibraryStorageInfoRequest = () => ({
    type: FETCH_STORAGE_INFORMATION_REQUEST,
});

export const fetchDocumentLibraryStorageInfoSuccess = payload => ({
    type: FETCH_STORAGE_INFORMATION_SUCCESS,
    payload,
});

export const fetchDocumentLibraryStorageInfoFailure = error => ({
    type: FETCH_STORAGE_INFORMATION_FAILURE,
    error,
});

export default () => dispatch => {
    dispatch(fetchDocumentLibraryStorageInfoRequest());

    return axios
        .get(`${API_URL}/document-library/storage-information`, getHeaders())
        .then(res => dispatch(fetchDocumentLibraryStorageInfoSuccess(res.data)))
        .catch(err => dispatch(fetchDocumentLibraryStorageInfoFailure(err.message)));
};
