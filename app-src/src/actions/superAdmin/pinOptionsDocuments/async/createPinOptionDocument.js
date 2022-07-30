import axios from 'axios';

import { ADMIN_API_URL } from 'config';
import { getHeaders } from 'helpers/api';

import {
    ADMIN_CREATE_PIN_OPTION_DOCUMENT_REQUEST,
    ADMIN_CREATE_PIN_OPTION_DOCUMENT_SUCCESS,
    ADMIN_CREATE_PIN_OPTION_DOCUMENT_FAILURE,
} from '../../../../constants/actionTypes/pinOptionsDocuments';

export const createPinOptionDocumentsRequest = () => ({
    type: ADMIN_CREATE_PIN_OPTION_DOCUMENT_REQUEST,
});

export const createPinOptionDocumentsSuccess = payload => ({
    type: ADMIN_CREATE_PIN_OPTION_DOCUMENT_SUCCESS,
    payload,
});

export const createPinOptionDocumentsFailure = error => ({
    type: ADMIN_CREATE_PIN_OPTION_DOCUMENT_FAILURE,
    error,
});

export default (postBody, id) => async dispatch => {
    dispatch(createPinOptionDocumentsRequest());

    return axios
        .post(`${ADMIN_API_URL}/pinoptions/document/${id}`, postBody, getHeaders())
        .then(res => dispatch(createPinOptionDocumentsSuccess(res.data)))
        .catch(err => dispatch(createPinOptionDocumentsFailure(err.message)));
};
