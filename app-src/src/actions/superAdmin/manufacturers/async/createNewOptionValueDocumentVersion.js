import axios from 'axios';
import {
    SA_CREATE_NEW_OPTION_VALUE_DOCUMENT_VERSION_REQUEST,
    SA_CREATE_NEW_OPTION_VALUE_DOCUMENT_VERSION_SUCCESS,
    SA_CREATE_NEW_OPTION_VALUE_DOCUMENT_VERSION_FAILURE,
} from 'constants/actionTypes/superAdminManufacturers';
import { ADMIN_API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import setAPIFieldErrors from 'actions/shared/generic/fieldErrors/sync/setAPIFieldErrors';

export const createNewOptionValueDocumentVersionRequest = () => ({
    type: SA_CREATE_NEW_OPTION_VALUE_DOCUMENT_VERSION_REQUEST,
});

export const createNewOptionValueDocumentVersionSuccess = (payload, optionValueID) => ({
    type: SA_CREATE_NEW_OPTION_VALUE_DOCUMENT_VERSION_SUCCESS,
    payload,
    optionValueID,
});

export const createNewOptionValueDocumentVersionFailure = error => ({
    type: SA_CREATE_NEW_OPTION_VALUE_DOCUMENT_VERSION_FAILURE,
    error,
});

export default (optionValueID, documentID, postBody) => dispatch => {
    dispatch(createNewOptionValueDocumentVersionRequest());
    return axios
        .put(
            `${ADMIN_API_URL}/manufacturer/optionvalues/${optionValueID}/documents/${documentID}`,
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
