import axios from 'axios';
import {
    CREATE_NEW_OPTION_VALUE_DOCUMENT_VERSION_REQUEST,
    CREATE_NEW_OPTION_VALUE_DOCUMENT_VERSION_SUCCESS,
    CREATE_NEW_OPTION_VALUE_DOCUMENT_VERSION_FAILURE,
} from 'constants/actionTypes/companyAdminManufacturers';
import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import setAPIFieldErrors from 'actions/shared/generic/fieldErrors/sync/setAPIFieldErrors';

export const createNewOptionValueDocumentVersionRequest = () => ({
    type: CREATE_NEW_OPTION_VALUE_DOCUMENT_VERSION_REQUEST,
});

export const createNewOptionValueDocumentVersionSuccess = (payload, optionValueID) => ({
    type: CREATE_NEW_OPTION_VALUE_DOCUMENT_VERSION_SUCCESS,
    payload,
    optionValueID,
});

export const createNewOptionValueDocumentVersionFailure = error => ({
    type: CREATE_NEW_OPTION_VALUE_DOCUMENT_VERSION_FAILURE,
    error,
});

export default (manufacturerID, optionValueID, documentID, postBody) => dispatch => {
    dispatch(createNewOptionValueDocumentVersionRequest());
    return axios
        .put(
            `${API_URL}/manufacturer/${manufacturerID}/optionvalues/${optionValueID}/documents/${documentID}`,
            postBody,
            getHeaders(),
        )
        .then(({ data }) =>
            dispatch(createNewOptionValueDocumentVersionSuccess(data, optionValueID)),
        )
        .catch(err => {
            dispatch(createNewOptionValueDocumentVersionFailure(err.message));

            if (err.response.status === 400) {
                dispatch(setAPIFieldErrors(err.response.data.errors));
            }
        });
};
