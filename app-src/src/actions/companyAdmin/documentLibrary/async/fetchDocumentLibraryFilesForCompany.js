import axios from 'axios';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import {
    FETCH_DOCUMENT_LIBRARY_FILES_FOR_COMPANY_REQUEST,
    FETCH_DOCUMENT_LIBRARY_FILES_FOR_COMPANY_SUCCESS,
    FETCH_DOCUMENT_LIBRARY_FILES_FOR_COMPANY_FAILURE,
} from 'constants/actionTypes/documentLibrary';

export const fetchAllLibraryDocumentsByCompanyRequest = () => ({
    type: FETCH_DOCUMENT_LIBRARY_FILES_FOR_COMPANY_REQUEST,
});

export const fetchAllLibraryDocumentsByCompanySuccess = payload => ({
    type: FETCH_DOCUMENT_LIBRARY_FILES_FOR_COMPANY_SUCCESS,
    payload,
});

export const fetchAllLibraryDocumentsByCompanyFailure = error => ({
    type: FETCH_DOCUMENT_LIBRARY_FILES_FOR_COMPANY_FAILURE,
    error,
});

export default companyID => dispatch => {
    dispatch(fetchAllLibraryDocumentsByCompanyRequest());

    return axios
        .get(`${API_URL}/document-library/${companyID}`, getHeaders())
        .then(res => dispatch(fetchAllLibraryDocumentsByCompanySuccess(res.data)))
        .catch(err => dispatch(fetchAllLibraryDocumentsByCompanyFailure(err.message)));
};
