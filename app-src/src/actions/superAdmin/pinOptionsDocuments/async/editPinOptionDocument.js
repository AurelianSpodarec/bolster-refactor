import axios from 'axios';

import { ADMIN_API_URL } from 'config';
import { getHeaders, handleErrors } from 'helpers/api';
import {
    ADMIN_EDIT_OPTION_DOCUMENT_REQUEST,
    ADMIN_EDIT_OPTION_DOCUMENT_SUCCESS,
    ADMIN_EDIT_OPTION_DOCUMENT_FAILURE,
} from 'constants/actionTypes/pinOptionsDocuments';

export const editPinOptionDocumentsRequest = () => ({
    type: ADMIN_EDIT_OPTION_DOCUMENT_REQUEST,
});

export const editPinOptionDocumentsSuccess = payload => ({
    type: ADMIN_EDIT_OPTION_DOCUMENT_SUCCESS,
    payload,
});

export const editPinOptionDocumentsFailure = error => ({
    type: ADMIN_EDIT_OPTION_DOCUMENT_FAILURE,
    error,
});

export default (id, postBody) => async dispatch => {
    dispatch(editPinOptionDocumentsRequest());

    return axios
        .patch(`${ADMIN_API_URL}/pinoptions/document/editversion/${id}`, postBody, getHeaders())
        .then(({ data }) => {
            dispatch(editPinOptionDocumentsSuccess(data));
        })

        .catch(err => dispatch(handleErrors(editPinOptionDocumentsFailure)(err)));
};
