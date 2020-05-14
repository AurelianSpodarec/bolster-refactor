import axios from 'axios';

import {
    SA_FETCH_DOCUMENTS_BY_OPTION_VALUE_REQUEST,
    SA_FETCH_DOCUMENTS_BY_OPTION_VALUE_SUCCESS,
    SA_FETCH_DOCUMENTS_BY_OPTION_VALUE_FAILURE,
} from 'constants/actionTypes/superAdminManufacturers';
import { ADMIN_API_URL } from 'config';
import { getHeaders } from 'helpers/api';

export const fetchDocumentsByOptionValueRequest = () => ({
    type: SA_FETCH_DOCUMENTS_BY_OPTION_VALUE_REQUEST,
});

export const fetchDocumentsByOptionValueSuccess = (payload, optionValueID) => ({
    type: SA_FETCH_DOCUMENTS_BY_OPTION_VALUE_SUCCESS,
    payload,
    optionValueID,
});

export const fetchDocumentsByOptionValueFailure = error => ({
    type: SA_FETCH_DOCUMENTS_BY_OPTION_VALUE_FAILURE,
    error,
});

export default optionValueID => dispatch => {
    dispatch(fetchDocumentsByOptionValueRequest());

    return axios
        .get(`${ADMIN_API_URL}/manufacturer/optionvalues/${optionValueID}/documents`, getHeaders())
        .then(({ data }) => dispatch(fetchDocumentsByOptionValueSuccess(data, optionValueID)))
        .catch(err => dispatch(fetchDocumentsByOptionValueFailure(err.message)));
};
