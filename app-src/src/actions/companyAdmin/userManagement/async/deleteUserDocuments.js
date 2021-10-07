import axios from 'axios';

import {
    DELETE_USER_DOCUMENTS_REQUEST,
    DELETE_USER_DOCUMENTS_SUCCESS,
    DELETE_USER_DOCUMENTS_FAILURE,
} from 'constants/actionTypes/usersManagement';
import { getHeaders } from 'helpers/api';
import { API_URL } from 'config';

export const deleteUserDocumentsRequest = () => ({
    type: DELETE_USER_DOCUMENTS_REQUEST,
});

export const deleteUserDocumentsSuccess = (payload, id) => ({
    type: DELETE_USER_DOCUMENTS_SUCCESS,
    payload,
    id,
});

export const deleteUserDocumentsFailure = error => ({
    type: DELETE_USER_DOCUMENTS_FAILURE,
    error,
});

export default id => dispatch => {
    dispatch(deleteUserDocumentsRequest());

    return axios
        .delete(`${API_URL}/users/documents/${id}`, getHeaders())
        .then(res => dispatch(deleteUserDocumentsSuccess(res.data, id)))
        .catch(err => dispatch(deleteUserDocumentsFailure(err.message)));
};
