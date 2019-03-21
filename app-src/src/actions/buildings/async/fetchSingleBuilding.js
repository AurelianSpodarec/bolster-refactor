import axios from 'axios';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import {
    FETCH_SINGLE_BUILDING_REQUEST,
    FETCH_SINGLE_BUILDING_SUCCESS,
    FETCH_SINGLE_BUILDING_FAILURE
} from 'constants/actionTypes/buildings';

export const fetchBuildingRequest = () => ({
    type: FETCH_SINGLE_BUILDING_REQUEST
});

export const fetchBuildingSuccess = payload => ({
    type: FETCH_SINGLE_BUILDING_SUCCESS,
    payload
});

export const fetchBuildingFailure = error => ({
    type: FETCH_SINGLE_BUILDING_FAILURE,
    error
});

export default id => dispatch => {
    dispatch(fetchBuildingRequest());
    axios
        .get(`${API_URL}/buildings/${id}`, getHeaders())
        .then(res => dispatch(fetchBuildingSuccess(res.data)))
        .catch(err => dispatch(fetchBuildingFailure(err.message)));
};
