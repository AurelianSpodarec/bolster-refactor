import axios from 'axios';

import {
    FETCH_ALL_USER_DOCUMENTS_REQUEST,
    FETCH_ALL_USER_DOCUMENTS_SUCCESS,
    FETCH_ALL_USER_DOCUMENTS_FAILURE,
} from 'constants/actionTypes/usersManagement';
import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';

export const fetchAllUserDocumentsRequest = () => ({
    type: FETCH_ALL_USER_DOCUMENTS_REQUEST,
});

export const fetchAllUserDocumentsSuccess = payload => ({
    type: FETCH_ALL_USER_DOCUMENTS_SUCCESS,
    payload,
});

export const fetchAllUserDocumentsFailure = error => ({
    type: FETCH_ALL_USER_DOCUMENTS_FAILURE,
    error,
});

export default () => dispatch => {
    dispatch(fetchAllUserDocumentsRequest());

    return axios
        .get(`${API_URL}/users/documents`, getHeaders())
        .then(res => dispatch(fetchAllUserDocumentsSuccess(res.data)))
        .catch(err => dispatch(fetchAllUserDocumentsFailure(err.message)));
};
