import axios from 'axios';
import {
    EDIT_OPTION_VALUE_DOCUMENT_REQUEST,
    EDIT_OPTION_VALUE_DOCUMENT_SUCCESS,
    EDIT_OPTION_VALUE_DOCUMENT_FAILURE,
} from 'constants/actionTypes/companyAdminManufacturers';
import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import setAPIFieldErrors from 'actions/shared/generic/fieldErrors/sync/setAPIFieldErrors';

export const editOptionValueDocumentRequest = () => ({
    type: EDIT_OPTION_VALUE_DOCUMENT_REQUEST,
});

export const editOptionValueDocumentSuccess = (payload, optionValueID, documentID) => ({
    type: EDIT_OPTION_VALUE_DOCUMENT_SUCCESS,
    payload,
    optionValueID,
    documentID,
});

export const editOptionValueDocumentFailure = error => ({
    type: EDIT_OPTION_VALUE_DOCUMENT_FAILURE,
    error,
});

export default (manufacturerID, optionValueID, documentID, postBody) => dispatch => {
    dispatch(editOptionValueDocumentRequest());
    return axios
        .patch(
            `${API_URL}/manufacturer/${manufacturerID}/optionvalues/${optionValueID}/documents/${documentID}`,
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
