import axios from 'axios';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import {
    FETCH_ALL_LIBRARY_DOCUMENTS_REQUEST,
    FETCH_ALL_LIBRARY_DOCUMENTS_SUCCESS,
    FETCH_ALL_LIBRARY_DOCUMENTS_FAILURE,
} from 'constants/actionTypes/documentLibrary';

export const fetchAllLibraryDocumentsRequest = () => ({
    type: FETCH_ALL_LIBRARY_DOCUMENTS_REQUEST,
});

export const fetchAllLibraryDocumentsSuccess = payload => ({
    type: FETCH_ALL_LIBRARY_DOCUMENTS_SUCCESS,
    payload,
});

export const fetchAllLibraryDocumentsFailure = error => ({
    type: FETCH_ALL_LIBRARY_DOCUMENTS_FAILURE,
    error,
});

export default (page, limit) => dispatch => {
    dispatch(fetchAllLibraryDocumentsRequest());

    return axios
        .get(`${API_URL}/TODO?page=${page}&limit=${limit}`, getHeaders())
        .then(res => dispatch(fetchAllLibraryDocumentsSuccess(res.data)))
        .catch(err => dispatch(fetchAllLibraryDocumentsFailure(err.message)));
};
