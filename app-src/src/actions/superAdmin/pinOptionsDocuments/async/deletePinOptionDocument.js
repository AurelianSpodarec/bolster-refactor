import axios from 'axios';

import { ADMIN_API_URL } from 'config/index';
import { getHeaders } from 'helpers/api';
import {
    ADMIN_DELETE_PIN_OPTION_DOCUMENT_REQUEST,
    ADMIN_DELETE_PIN_OPTION_DOCUMENT_SUCCESS,
    ADMIN_DELETE_PIN_OPTION_DOCUMENT_FAILURE,
} from 'constants/actionTypes/pinOptionsDocuments';

export const deletePinOptionDocumentRequest = () => ({
    type: ADMIN_DELETE_PIN_OPTION_DOCUMENT_REQUEST,
});

export const deletePinOptionDocumentSuccess = payload => ({
    type: ADMIN_DELETE_PIN_OPTION_DOCUMENT_SUCCESS,
    payload,
});

export const deletePinOptionDocumentFailure = error => ({
    type: ADMIN_DELETE_PIN_OPTION_DOCUMENT_FAILURE,
    error,
});

export default document => async dispatch => {
    dispatch(deletePinOptionDocumentRequest());

    return axios
        .delete(`${ADMIN_API_URL}/pinoptions/document/delete/${document.id}`, getHeaders())
        .then(() => dispatch(deletePinOptionDocumentSuccess(document)))
        .catch(error => dispatch(deletePinOptionDocumentFailure(error)));
};
