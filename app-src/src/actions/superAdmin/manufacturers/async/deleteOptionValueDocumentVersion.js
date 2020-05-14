import axios from 'axios';
import {
    SA_DELETE_OPTION_VALUE_DOCUMENT_VERSION_REQUEST,
    SA_DELETE_OPTION_VALUE_DOCUMENT_VERSION_SUCCESS,
    SA_DELETE_OPTION_VALUE_DOCUMENT_VERSION_FAILURE,
} from 'constants/actionTypes/superAdminManufacturers';
import { ADMIN_API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import setAPIFieldErrors from 'actions/shared/generic/fieldErrors/sync/setAPIFieldErrors';

export const deleteOptionValueDocumentVersionRequest = () => ({
    type: SA_DELETE_OPTION_VALUE_DOCUMENT_VERSION_REQUEST,
});

export const deleteOptionValueDocumentVersionSuccess = (optionValueID, documentID, versionID) => ({
    type: SA_DELETE_OPTION_VALUE_DOCUMENT_VERSION_SUCCESS,
    optionValueID,
    documentID,
    versionID,
});

export const deleteOptionValueDocumentVersionFailure = error => ({
    type: SA_DELETE_OPTION_VALUE_DOCUMENT_VERSION_FAILURE,
    error,
});

export default (optionValueID, documentID, versionID) => dispatch => {
    dispatch(deleteOptionValueDocumentVersionRequest());
    return axios
        .delete(
            `${ADMIN_API_URL}/manufacturer/optionvalues/${optionValueID}/documents/${documentID}/versions${versionID}`,
            getHeaders(),
        )
        .then(() =>
            dispatch(deleteOptionValueDocumentVersionSuccess(optionValueID, documentID, versionID)),
        )
        .catch(err => {
            dispatch(deleteOptionValueDocumentVersionFailure(err.message));

            if (err.response.status === 400) {
                dispatch(setAPIFieldErrors(err.response.data.errors));
            }
        });
};
