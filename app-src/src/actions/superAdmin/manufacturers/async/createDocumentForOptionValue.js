import axios from 'axios';
import {
    SA_CREATE_DOCUMENT_FOR_OPTION_VALUE_REQUEST,
    SA_CREATE_DOCUMENT_FOR_OPTION_VALUE_SUCCESS,
    SA_CREATE_DOCUMENT_FOR_OPTION_VALUE_FAILURE,
} from 'constants/actionTypes/superAdminManufacturers';
import { ADMIN_API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import setAPIFieldErrors from 'actions/shared/generic/fieldErrors/sync/setAPIFieldErrors';

export const createDocumentForOptionValueRequest = () => ({
    type: SA_CREATE_DOCUMENT_FOR_OPTION_VALUE_REQUEST,
});

export const createDocumentForOptionValueSuccess = (payload, optionValueID) => ({
    type: SA_CREATE_DOCUMENT_FOR_OPTION_VALUE_SUCCESS,
    payload,
    optionValueID,
});

export const createDocumentForOptionValueFailure = error => ({
    type: SA_CREATE_DOCUMENT_FOR_OPTION_VALUE_FAILURE,
    error,
});

export default (optionValueID, postBody) => dispatch => {
    dispatch(createDocumentForOptionValueRequest());
    return axios
        .post(
            `${ADMIN_API_URL}/manufacturer/optionvalues/${optionValueID}/documents`,
            postBody,
            getHeaders(),
        )
        .then(({ data }) => dispatch(createDocumentForOptionValueSuccess(data, optionValueID)))
        .catch(err => {
            dispatch(createDocumentForOptionValueFailure(err.message));

            if (err.response.status === 400) {
                dispatch(setAPIFieldErrors(err.response.data.errors));
            }
        });
};
