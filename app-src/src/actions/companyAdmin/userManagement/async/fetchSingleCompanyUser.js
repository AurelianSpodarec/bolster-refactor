import axios from 'axios';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import {
    FETCH_SINGLE_COMPANY_USER_REQUEST,
    FETCH_SINGLE_COMPANY_USER_SUCCESS,
    FETCH_SINGLE_COMPANY_USER_FAILURE
} from 'constants/actionTypes/';

export const fetchSingleCompanyUserRequest = () => ({
    type: FETCH_SINGLE_COMPANY_USER_REQUEST
});

export const fetchSingleCompanyUserSuccess = payload => ({
    type: FETCH_SINGLE_COMPANY_USER_SUCCESS,
    payload
});

export const fetchSingleCompanyUserFailure = error => ({
    type: FETCH_SINGLE_COMPANY_USER_FAILURE,
    error
});

export default id => dispatch => {
    dispatch(fetchSingleCompanyUserRequest());
    return axios
        .get(`${API_URL}/company/users/${id}`, getHeaders())
        .then(res => dispatch(fetchSingleCompanyUserSuccess(res.data)))
        .catch(err => dispatch(fetchSingleCompanyUserFailure(err.message)));
};
