import axios from 'axios';

import { API_URL } from 'config';
import {
    FETCH_PIN_OPTION_DOCUMENTS_VERSIONS_FAILURE,
    FETCH_PIN_OPTION_DOCUMENTS_VERSIONS_REQUEST,
    FETCH_PIN_OPTION_DOCUMENTS_VERSIONS_SUCCESS,
} from 'constants/actionTypes/pinOptionsDocuments';
import { getHeaders } from 'helpers/api';

export const fetchPinOptionsDocumentsVersionsRequest = () => ({
    type: FETCH_PIN_OPTION_DOCUMENTS_VERSIONS_REQUEST,
});

export const fetchPinOptionsDocumentsVersionsSuccess = payload => ({
    type: FETCH_PIN_OPTION_DOCUMENTS_VERSIONS_SUCCESS,
    payload,
});

export const fetchPinOptionsDocumentsVersionsFailure = error => ({
    type: FETCH_PIN_OPTION_DOCUMENTS_VERSIONS_FAILURE,
    error,
});

export default () => async dispatch => {
    dispatch(fetchPinOptionsDocumentsVersionsRequest());

    return axios
        .get(`${API_URL}/pinoptions/document/versions`, getHeaders())
        .then(res => dispatch(fetchPinOptionsDocumentsVersionsSuccess(res.data)))
        .catch(err => dispatch(fetchPinOptionsDocumentsVersionsFailure(err.message)));
};
