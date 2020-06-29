import axios from 'axios';
import {
    DELETE_OPTION_VALUE_DOCUMENT_VERSION_REQUEST,
    DELETE_OPTION_VALUE_DOCUMENT_VERSION_SUCCESS,
    DELETE_OPTION_VALUE_DOCUMENT_VERSION_FAILURE,
} from 'constants/actionTypes/companyAdminManufacturers';
import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import setAPIFieldErrors from 'actions/shared/generic/fieldErrors/sync/setAPIFieldErrors';

export const deleteOptionValueDocumentVersionRequest = () => ({
    type: DELETE_OPTION_VALUE_DOCUMENT_VERSION_REQUEST,
});

export const deleteOptionValueDocumentVersionSuccess = (
    optionValueID,
    documentID,
    versionID,
    isLastVersion,
) => ({
    type: DELETE_OPTION_VALUE_DOCUMENT_VERSION_SUCCESS,
    optionValueID,
    documentID,
    versionID,
    isLastVersion,
});

export const deleteOptionValueDocumentVersionFailure = error => ({
    type: DELETE_OPTION_VALUE_DOCUMENT_VERSION_FAILURE,
    error,
});

export default (
    manufacturerID,
    optionValueID,
    documentID,
    versionID,
    isLastVersion,
) => dispatch => {
    dispatch(deleteOptionValueDocumentVersionRequest());
    return axios
        .delete(
            `${API_URL}/manufacturer/${manufacturerID}/optionvalues/${optionValueID}/documents/${documentID}/versions/${versionID}`,
            getHeaders(),
        )
        .then(() =>
            dispatch(
                deleteOptionValueDocumentVersionSuccess(
                    optionValueID,
                    documentID,
                    versionID,
                    isLastVersion,
                ),
            ),
        )
        .catch(err => {
            dispatch(deleteOptionValueDocumentVersionFailure(err.message));

            if (err.response.status === 400) {
                dispatch(setAPIFieldErrors(err.response.data.errors));
            }
        });
};
