import axios from 'axios';

import { API_URL } from 'config/index';
import { getHeaders } from 'helpers/api';
import {
    DELETE_PRELIM_REQUEST,
    DELETE_PRELIM_SUCCESS,
    DELETE_PRELIM_FAILURE,
} from 'constants/actionTypes/prelims';

export const deletePrelimRequest = () => ({
    type: DELETE_PRELIM_REQUEST,
});

export const deletePrelimSuccess = id => ({
    type: DELETE_PRELIM_SUCCESS,
    id,
});

export const deletePrelimFailure = error => ({
    type: DELETE_PRELIM_FAILURE,
    error,
});

export default id => dispatch => {
    dispatch(deletePrelimRequest());

    return axios
        .delete(`${API_URL}/prelims/${id}`, getHeaders())
        .then(() => dispatch(deletePrelimSuccess(id)))
        .catch(error => dispatch(deletePrelimFailure(error)));
};
