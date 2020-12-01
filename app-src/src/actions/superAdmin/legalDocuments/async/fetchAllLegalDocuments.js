import axios from 'axios';

import {
    FETCH_ALL_LEGAL_DOCUMENTS_REQUEST,
    FETCH_ALL_LEGAL_DOCUMENTS_SUCCESS,
    FETCH_ALL_LEGAL_DOCUMENTS_FAILURE,
} from 'constants/actionTypes/legalDocuments';
import { ADMIN_API_URL } from 'config';
import { getHeaders } from 'helpers/api';

export const fetchAllLegalDocumentsRequest = () => ({
    type: FETCH_ALL_LEGAL_DOCUMENTS_REQUEST,
});

export const fetchAllLegalDocumentsSuccess = payload => ({
    type: FETCH_ALL_LEGAL_DOCUMENTS_SUCCESS,
    payload,
});

export const fetchAllLegalDocumentsFailure = error => ({
    type: FETCH_ALL_LEGAL_DOCUMENTS_FAILURE,
    error,
});

export default () => dispatch => {
    dispatch(fetchAllLegalDocumentsRequest());

    return axios
        .get(`${ADMIN_API_URL}/legal-documents`, getHeaders())
        .then(res => dispatch(fetchAllLegalDocumentsSuccess(res.data)))
        .catch(err => dispatch(fetchAllLegalDocumentsFailure(err.message)));
};
