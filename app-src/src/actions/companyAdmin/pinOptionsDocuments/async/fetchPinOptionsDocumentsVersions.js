import axios from 'axios';

import { API_URL } from 'config';
import {
    FETCH_PIN_OPTION_DOCUMENTS_FAILURE_VERSIONS,
    FETCH_PIN_OPTION_DOCUMENTS_REQUEST_VERSIONS,
    FETCH_PIN_OPTION_DOCUMENTS_SUCCESS_VERSIONS,
} from 'constants/actionTypes/pinOptionsDocuments';
import { getHeaders } from 'helpers/api';

export const fetchPinOptionsDocumentsVersionsRequest = () => ({
    type: FETCH_PIN_OPTION_DOCUMENTS_REQUEST_VERSIONS,
});

export const fetchPinOptionsDocumentsVersionsSuccess = payload => ({
    type: FETCH_PIN_OPTION_DOCUMENTS_SUCCESS_VERSIONS,
    payload,
});

export const fetchPinOptionsDocumentsVersionsFailure = error => ({
    type: FETCH_PIN_OPTION_DOCUMENTS_FAILURE_VERSIONS,
    error,
});

export default id => async dispatch => {
    dispatch(fetchPinOptionsDocumentsVersionsRequest());

    return axios
        .get(`${API_URL}/pinoptions/documents/${id}`, getHeaders())
        .then(res => dispatch(fetchPinOptionsDocumentsVersionsSuccess(res.data)))
        .catch(err => dispatch(fetchPinOptionsDocumentsVersionsFailure(err.message)));
};
