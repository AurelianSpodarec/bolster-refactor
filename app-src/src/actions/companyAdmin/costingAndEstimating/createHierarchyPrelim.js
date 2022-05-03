import axios from 'axios';

import { API_URL } from 'config';
import {
    CREATE_HIERARCHY_PRELIM_REQUEST,
    CREATE_HIERARCHY_PRELIM_SUCCESS,
    CREATE_HIERARCHY_PRELIM_FAILURE,
} from 'constants/actionTypes/prelims';
import { getHeaders } from 'helpers/api';

export const createHierarchyPrelimRequest = () => ({
    type: CREATE_HIERARCHY_PRELIM_REQUEST,
});

export const createHierarchyPrelimSuccess = payload => ({
    type: CREATE_HIERARCHY_PRELIM_SUCCESS,
    payload,
});

export const createHierarchyPrelimFailure = error => ({
    type: CREATE_HIERARCHY_PRELIM_FAILURE,
    error,
});

export default postBody => async dispatch => {
    dispatch(createHierarchyPrelimRequest());

    return axios
        .post(`${API_URL}/CreatePrelim`, postBody, getHeaders())
        .then(res => dispatch(createHierarchyPrelimSuccess(res.data)))
        .catch(err => dispatch(createHierarchyPrelimFailure(err.message)));
};
