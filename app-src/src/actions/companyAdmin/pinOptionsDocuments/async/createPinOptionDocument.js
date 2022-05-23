import axios from 'axios';

import { API_URL } from 'config';
import { getHeaders, handleErrors } from 'helpers/api';

import {
    CREATE_PIN_OPTION_DOCUMENT_REQUEST,
    CREATE_PIN_OPTION_DOCUMENT_SUCCESS,
    CREATE_PIN_OPTION_DOCUMENT_FAILURE,
} from '../../../../constants/actionTypes/pinOptionsDocuments';

export const createPinOptionDocumentsRequest = () => ({
    type: CREATE_PIN_OPTION_DOCUMENT_REQUEST,
});

export const createPinOptionDocumentsSuccess = payload => ({
    type: CREATE_PIN_OPTION_DOCUMENT_SUCCESS,
    payload,
});

export const createPinOptionDocumentsFailure = error => ({
    type: CREATE_PIN_OPTION_DOCUMENT_FAILURE,
    error,
});

export default (postBody, id) => async dispatch => {
    dispatch(createPinOptionDocumentsRequest());

    return axios
        .post(`${API_URL}/pinoptions/document/${id}`, postBody, getHeaders())
        .then(res => dispatch(createPinOptionDocumentsSuccess(res.data)))
        .catch(err => dispatch(handleErrors(createPinOptionDocumentsFailure)(err)));
};
