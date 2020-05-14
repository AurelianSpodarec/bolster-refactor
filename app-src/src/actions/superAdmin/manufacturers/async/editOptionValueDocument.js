import axios from 'axios';
import {
    SA_EDIT_OPTION_VALUE_DOCUMENT_REQUEST,
    SA_EDIT_OPTION_VALUE_DOCUMENT_SUCCESS,
    SA_EDIT_OPTION_VALUE_DOCUMENT_FAILURE,
} from 'constants/actionTypes/superAdminManufacturers';
import { ADMIN_API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import setAPIFieldErrors from 'actions/shared/generic/fieldErrors/sync/setAPIFieldErrors';

export const editOptionValueDocumentRequest = () => ({
    type: SA_EDIT_OPTION_VALUE_DOCUMENT_REQUEST,
});

export const editOptionValueDocumentSuccess = (payload, optionValueID, documentID) => ({
    type: SA_EDIT_OPTION_VALUE_DOCUMENT_SUCCESS,
    payload,
    optionValueID,
    documentID,
});

export const editOptionValueDocumentFailure = error => ({
    type: SA_EDIT_OPTION_VALUE_DOCUMENT_FAILURE,
    error,
});

export default (optionValueID, documentID, postBody) => dispatch => {
    dispatch(editOptionValueDocumentRequest());
    return axios
        .patch(
            `${ADMIN_API_URL}/manufacturer/optionvalues/${optionValueID}/documents/${documentID}`,
            postBody,
            getHeaders(),
        )
        .then(({ data }) =>
            dispatch(editOptionValueDocumentSuccess(data, optionValueID, documentID)),
        )
        .catch(err => {
            dispatch(editOptionValueDocumentFailure(err.message));

            if (err.response.status === 400) {
                dispatch(setAPIFieldErrors(err.response.data.errors));
            }
        });
};
