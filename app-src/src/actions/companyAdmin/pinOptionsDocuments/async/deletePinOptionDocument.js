import axios from 'axios';

import { API_URL } from 'config/index';
import { getHeaders } from 'helpers/api';
import {
    DELETE_PIN_OPTION_DOCUMENT_REQUEST,
    DELETE_PIN_OPTION_DOCUMENT_SUCCESS,
    DELETE_PIN_OPTION_DOCUMENT_FAILURE,
} from 'constants/actionTypes/pinOptionsDocuments';

export const deletePinOptionDocumentRequest = () => ({
    type: DELETE_PIN_OPTION_DOCUMENT_REQUEST,
});

export const deletePinOptionDocumentSuccess = payload => ({
    type: DELETE_PIN_OPTION_DOCUMENT_SUCCESS,
    payload,
});

export const deletePinOptionDocumentFailure = error => ({
    type: DELETE_PIN_OPTION_DOCUMENT_FAILURE,
    error,
});

export default id => dispatch => {
    dispatch(deletePinOptionDocumentRequest());

    return axios
        .delete(`${API_URL}/pinoptions/document/delete/${id}`, getHeaders())
        .then(({ data }) => dispatch(deletePinOptionDocumentSuccess(data)))
        .catch(error => dispatch(deletePinOptionDocumentFailure(error)));
};
