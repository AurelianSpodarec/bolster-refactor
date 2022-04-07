import axios from 'axios';

import { API_URL } from 'config';
import {
    CREATE_PRELIM_REQUEST,
    CREATE_PRELIM_SUCCESS,
    CREATE_PRELIM_FAILURE,
} from 'constants/actionTypes/prelims';
import { getHeaders } from 'helpers/api';

export const createPrelimRequest = () => ({
    type: CREATE_PRELIM_REQUEST,
});

export const createPrelimSuccess = payload => ({
    type: CREATE_PRELIM_SUCCESS,
    payload,
});

export const createPrelimFailure = error => ({
    type: CREATE_PRELIM_FAILURE,
    error,
});

export default postBody => dispatch => {
    dispatch(createPrelimRequest());

    return axios
        .post(`${API_URL}/prelims`, postBody, getHeaders())
        .then(res => dispatch(createPrelimSuccess(res.data)))
        .catch(err => dispatch(createPrelimFailure(err.message)));
};
