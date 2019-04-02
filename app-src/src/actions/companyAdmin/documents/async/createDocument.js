import {
    CREATE_DOCUMENT_REQUEST,
    CREATE_DOCUMENT_SUCCESS,
    CREATE_DOCUMENT_FAILURE
} from 'constants/actionTypes/documents';
import Axios from 'axios';
import { API_URL } from 'config';
import setAPIFieldErrors from 'actions/generic/fieldErrors/sync/setAPIFieldErrors';
import { getHeaders } from 'helpers/api';

export const createDocumentRequest = () => ({
    type: CREATE_DOCUMENT_REQUEST
});

export const createDocumentSuccess = payload => ({
    type: CREATE_DOCUMENT_SUCCESS,
    payload
});

export const createDocumentFailure = error => ({
    type: CREATE_DOCUMENT_FAILURE,
    error
});

export default (type, id, postBody) => dispatch => {
    dispatch(createDocumentRequest());
    return Axios.post(
        `${API_URL}/documents/${type}/${id}`,
        postBody,
        getHeaders()
    )
        .then(({ data }) => dispatch(createDocumentSuccess(data)))
        .catch(err => {
            dispatch(createDocumentFailure(err.message));
            if (err.response.status === 400) {
                dispatch(setAPIFieldErrors(err.response.data.errors));
            }
        });
};
