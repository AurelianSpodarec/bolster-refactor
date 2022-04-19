import axios from 'axios';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';

import {
    CREATE_PIN_OPTION_DOCUMENT_REQUEST,
    CREATE_PIN_OPTION_DOCUMENT_SUCCESS,
    FETCH_PIN_OPTION_DOCUMENTS_FAILURE,
} from '../../../../constants/actionTypes/pinOptionsDocuments';

export const createPinOptionDocumentsRequest = () => ({
    type: CREATE_PIN_OPTION_DOCUMENT_REQUEST,
});

export const createPinOptionDocumentsSuccess = payload => ({
    type: CREATE_PIN_OPTION_DOCUMENT_SUCCESS,
    payload,
});

export const createPinOptionDocumentsFailure = error => ({
    type: FETCH_PIN_OPTION_DOCUMENTS_FAILURE,
    error,
});

export default (postBody, id) => async dispatch => {
    dispatch(createPinOptionDocumentsRequest());

    return axios
        .post(`${API_URL}/pinoptions/document/${id}`, postBody, getHeaders())
        .then(res => dispatch(createPinOptionDocumentsSuccess(res.data)))
        .catch(err => dispatch(createPinOptionDocumentsFailure(err.message)));
};
