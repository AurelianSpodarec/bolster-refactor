import axios from 'axios';

import { ADMIN_API_URL } from 'config';
import {
    ADMIN_FETCH_PIN_OPTION_DOCUMENTS_VERSIONS_FAILURE,
    ADMIN_FETCH_PIN_OPTION_DOCUMENTS_VERSIONS_REQUEST,
    ADMIN_FETCH_PIN_OPTION_DOCUMENTS_VERSIONS_SUCCESS,
} from 'constants/actionTypes/pinOptionsDocuments';
import { getHeaders } from 'helpers/api';

export const fetchPinOptionsDocumentsVersionsRequest = () => ({
    type: ADMIN_FETCH_PIN_OPTION_DOCUMENTS_VERSIONS_REQUEST,
});

export const fetchPinOptionsDocumentsVersionsSuccess = payload => ({
    type: ADMIN_FETCH_PIN_OPTION_DOCUMENTS_VERSIONS_SUCCESS,
    payload,
});

export const fetchPinOptionsDocumentsVersionsFailure = error => ({
    type: ADMIN_FETCH_PIN_OPTION_DOCUMENTS_VERSIONS_FAILURE,
    error,
});

export default optionID => async dispatch => {
    dispatch(fetchPinOptionsDocumentsVersionsRequest());

    return axios
        .get(`${ADMIN_API_URL}/pinoptions/document/versions/${optionID}`, getHeaders())
        .then(res => dispatch(fetchPinOptionsDocumentsVersionsSuccess(res.data)))
        .catch(err => dispatch(fetchPinOptionsDocumentsVersionsFailure(err.message)));
};
