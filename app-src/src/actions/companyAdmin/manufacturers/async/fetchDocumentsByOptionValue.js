import axios from 'axios';

import {
    FETCH_DOCUMENTS_BY_OPTION_VALUE_REQUEST,
    FETCH_DOCUMENTS_BY_OPTION_VALUE_SUCCESS,
    FETCH_DOCUMENTS_BY_OPTION_VALUE_FAILURE,
} from 'constants/actionTypes/companyAdminManufacturers';
import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';

export const fetchDocumentsByOptionValueRequest = () => ({
    type: FETCH_DOCUMENTS_BY_OPTION_VALUE_REQUEST,
});

export const fetchDocumentsByOptionValueSuccess = (payload, optionValueID) => ({
    type: FETCH_DOCUMENTS_BY_OPTION_VALUE_SUCCESS,
    payload,
    optionValueID,
});

export const fetchDocumentsByOptionValueFailure = error => ({
    type: FETCH_DOCUMENTS_BY_OPTION_VALUE_FAILURE,
    error,
});

export default (manufacturerID, optionValueID) => dispatch => {
    dispatch(fetchDocumentsByOptionValueRequest());

    return axios
        .get(
            `${API_URL}/manufacturer/${manufacturerID}/optionvalues/${optionValueID}/documents`,
            getHeaders(),
        )
        .then(({ data }) => dispatch(fetchDocumentsByOptionValueSuccess(data, optionValueID)))
        .catch(err => dispatch(fetchDocumentsByOptionValueFailure(err.message)));
};
