import axios from 'axios';

import { ADMIN_API_URL } from 'config';
import {
    ADMIN_FETCH_PIN_OPTION_DOCUMENTS_FAILURE,
    ADMIN_FETCH_PIN_OPTION_DOCUMENTS_REQUEST,
    ADMIN_FETCH_PIN_OPTION_DOCUMENTS_SUCCESS,
} from 'constants/actionTypes/pinOptionsDocuments';
import { getHeaders } from 'helpers/api';

export const fetchPinOptionsDocumentsRequest = () => ({
    type: ADMIN_FETCH_PIN_OPTION_DOCUMENTS_REQUEST,
});

export const fetchPinOptionsDocumentsSuccess = payload => ({
    type: ADMIN_FETCH_PIN_OPTION_DOCUMENTS_SUCCESS,
    payload,
});

export const fetchPinOptionsDocumentsFailure = error => ({
    type: ADMIN_FETCH_PIN_OPTION_DOCUMENTS_FAILURE,
    error,
});

export default () => async dispatch => {
    dispatch(fetchPinOptionsDocumentsRequest());

    return axios
        .get(`${ADMIN_API_URL}/pinoptions/documents`, getHeaders())
        .then(res => dispatch(fetchPinOptionsDocumentsSuccess(res.data)))
        .catch(err => dispatch(fetchPinOptionsDocumentsFailure(err.message)));
};
