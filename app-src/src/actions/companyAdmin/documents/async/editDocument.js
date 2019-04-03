import axios from 'axios';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import setAPIFieldErrors from 'actions/shared/generic/fieldErrors/sync/setAPIFieldErrors';
import {
    EDIT_DOCUMENT_REQUEST,
    EDIT_DOCUMENT_SUCCESS,
    EDIT_DOCUMENT_FAILURE
} from 'constants/actionTypes/documents';

export const editDocumentRequest = () => ({
    type: EDIT_DOCUMENT_REQUEST
});

export const editDocumentSuccess = payload => ({
    type: EDIT_DOCUMENT_SUCCESS,
    payload
});

export const editDocumentFailure = error => ({
    type: EDIT_DOCUMENT_FAILURE,
    error
});

export default (id, postBody) => dispatch => {
    dispatch(editDocumentRequest());
    return axios
        .post(`${API_URL}/documents/${id}`, postBody, getHeaders())
        .then(({ data }) => dispatch(editDocumentSuccess(data)))
        .catch(err => {
            dispatch(editDocumentFailure(err.message));
            if (err.response.status === 400) {
                dispatch(setAPIFieldErrors(err.response.data.errors));
            }
        });
};
