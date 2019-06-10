import axios from 'axios';

import { getHeaders } from 'helpers/api';
import { CLIENT_API_URL } from 'config/index';

import {
    CLIENT_FETCH_DOCUMENTS_REQUEST,
    CLIENT_FETCH_DOCUMENTS_SUCCESS,
    CLIENT_FETCH_DOCUMENTS_FAILURE
} from 'constants/actionTypes/documents';

export const fetchDocumentsRequest = () => ({
    type: CLIENT_FETCH_DOCUMENTS_REQUEST
});

export const fetchDocumentsSuccess = payload => ({
    type: CLIENT_FETCH_DOCUMENTS_SUCCESS,
    payload
});

export const fetchDocumentsFailure = error => ({
    type: CLIENT_FETCH_DOCUMENTS_FAILURE,
    error
});

//HierarchyType = Site/Building/Floor/Drawing
export default (companyID, HierarchyType, ID) => dispatch => {
    dispatch(fetchDocumentsRequest());
    return axios
        .get(
            `${CLIENT_API_URL}/documents/${companyID}/${HierarchyType}/${ID}`,
            getHeaders()
        )
        .then(res => dispatch(fetchDocumentsSuccess(res.data)))
        .catch(error => {
            dispatch(fetchDocumentsFailure(error.message));
        });
};
