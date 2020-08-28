import axios from 'axios';

import {
    FETCH_OPERATIVES_FOR_FLOOR_REQUEST,
    FETCH_OPERATIVES_FOR_FLOOR_SUCCESS,
    FETCH_OPERATIVES_FOR_FLOOR_FAILURE,
} from 'constants/actionTypes/operatives';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';

export const fetchOperativesForHierarchyRequest = () => ({
    type: FETCH_OPERATIVES_FOR_FLOOR_REQUEST,
});

export const fetchOperativesForHierarchySuccess = payload => ({
    type: FETCH_OPERATIVES_FOR_FLOOR_SUCCESS,
    payload,
});

export const fetchOperativesForHierarchyFailure = error => ({
    type: FETCH_OPERATIVES_FOR_FLOOR_FAILURE,
    error,
});

export default hierarchyID => dispatch => {
    dispatch(fetchOperativesForHierarchyRequest());

    return axios
        .get(`${API_URL}/ClientPermissions/${hierarchyID}`, getHeaders())
        .then(res => dispatch(fetchOperativesForHierarchySuccess(res.data)))
        .catch(err => dispatch(fetchOperativesForHierarchyFailure(err.message)));
};
