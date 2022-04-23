import axios from 'axios';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import {
    EDIT_PIN_OPTION_DOCUMENT_REQUEST,
    EDIT_PIN_OPTION_DOCUMENT_SUCCESS,
    EDIT_PIN_OPTION_DOCUMENT_FAILURE,
} from 'constants/actionTypes/pinOptionsDocuments';

export const editPinOptionDocumentsRequest = () => ({
    type: EDIT_PIN_OPTION_DOCUMENT_REQUEST,
});

export const editPinOptionDocumentsSuccess = payload => ({
    type: EDIT_PIN_OPTION_DOCUMENT_SUCCESS,
    payload,
});

export const editPinOptionDocumentsFailure = error => ({
    type: EDIT_PIN_OPTION_DOCUMENT_FAILURE,
    error,
});

export default (id, postBody) => async dispatch => {
    dispatch(editPinOptionDocumentsRequest());

    return axios
        .patch(`${API_URL}/pinoptions/document/editversion/${id}`, postBody, getHeaders())
        .then(res => dispatch(editPinOptionDocumentsSuccess(res.data)))
        .catch(err => dispatch(editPinOptionDocumentsFailure(err.message)));
};
