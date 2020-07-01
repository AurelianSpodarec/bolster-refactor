import axios from 'axios';
import {
    CREATE_DOCUMENT_FOR_OPTION_VALUE_REQUEST,
    CREATE_DOCUMENT_FOR_OPTION_VALUE_SUCCESS,
    CREATE_DOCUMENT_FOR_OPTION_VALUE_FAILURE,
} from 'constants/actionTypes/companyAdminManufacturers';
import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import setAPIFieldErrors from 'actions/shared/generic/fieldErrors/sync/setAPIFieldErrors';

export const createDocumentForOptionValueRequest = () => ({
    type: CREATE_DOCUMENT_FOR_OPTION_VALUE_REQUEST,
});

export const createDocumentForOptionValueSuccess = (payload, optionValueID) => ({
    type: CREATE_DOCUMENT_FOR_OPTION_VALUE_SUCCESS,
    payload,
    optionValueID,
});

export const createDocumentForOptionValueFailure = error => ({
    type: CREATE_DOCUMENT_FOR_OPTION_VALUE_FAILURE,
    error,
});

export default (manufacturerID, optionValueID, postBody) => dispatch => {
    dispatch(createDocumentForOptionValueRequest());
    return axios
        .post(
            `${API_URL}/manufacturer/${manufacturerID}/optionvalues/${optionValueID}/documents`,
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
