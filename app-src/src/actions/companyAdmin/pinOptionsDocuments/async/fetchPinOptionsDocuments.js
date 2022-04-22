import axios from 'axios';

import { API_URL } from 'config';
import {
    FETCH_PIN_OPTION_DOCUMENTS_FAILURE,
    FETCH_PIN_OPTION_DOCUMENTS_REQUEST,
    FETCH_PIN_OPTION_DOCUMENTS_SUCCESS,
} from 'constants/actionTypes/pinOptionsDocuments';
import { getHeaders } from 'helpers/api';

export const fetchPinOptionsDocumentsRequest = () => ({
    type: FETCH_PIN_OPTION_DOCUMENTS_REQUEST,
});

export const fetchPinOptionsDocumentsSuccess = payload => ({
    type: FETCH_PIN_OPTION_DOCUMENTS_SUCCESS,
    payload,
});

export const fetchPinOptionsDocumentsFailure = error => ({
    type: FETCH_PIN_OPTION_DOCUMENTS_FAILURE,
    error,
});

export default () => async dispatch => {
    dispatch(fetchPinOptionsDocumentsRequest());

    return axios
        .get(`${API_URL}/pinoptions/documents/`, getHeaders())
        .then(res => dispatch(fetchPinOptionsDocumentsSuccess(res.data)))
        .catch(err => dispatch(fetchPinOptionsDocumentsFailure(err.message)));
};
