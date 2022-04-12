import axios from 'axios';

import { API_URL } from 'config';
import {
    FETCH_PRELIM_FAILURE,
    FETCH_PRELIM_REQUEST,
    FETCH_PRELIM_SUCCESS,
} from 'constants/actionTypes/prelims';
import { getHeaders } from 'helpers/api';

export const fetchPrelimRequest = () => ({
    type: FETCH_PRELIM_REQUEST,
});

export const fetchPrelimSuccess = payload => ({
    type: FETCH_PRELIM_SUCCESS,
    payload,
});

export const fetchPrelimFailure = error => ({
    type: FETCH_PRELIM_FAILURE,
    error,
});

export default id => dispatch => {
    dispatch(fetchPrelimRequest());

    return axios
        .get(`${API_URL}/prelims/${id}`, getHeaders())
        .then(res => dispatch(fetchPrelimSuccess(res.data)))
        .catch(err => dispatch(fetchPrelimFailure(err.message)));
};
