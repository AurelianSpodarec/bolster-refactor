import axios from 'axios';
import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';

import {
    FETCH_ALL_BUILDINGS_REQUEST,
    FETCH_ALL_BUILDINGS_SUCCESS,
    FETCH_ALL_BUILDINGS_FAILURE
} from 'constants/actionTypes/buildings';

export const fetchAllBuildingsRequest = () => ({
    type: FETCH_ALL_BUILDINGS_REQUEST
});

export const fetchAllBuildingsSuccess = payload => ({
    type: FETCH_ALL_BUILDINGS_SUCCESS,
    payload
});

export const fetchAllBuildingsFailure = error => ({
    type: FETCH_ALL_BUILDINGS_FAILURE,
    error
});

export default () => dispatch => {
    dispatch(fetchAllBuildingsRequest());

    axios
        .get(`${API_URL}/buildings`, getHeaders())
        .then(res => dispatch(fetchAllBuildingsSuccess(res.data)))
        .catch(err => dispatch(fetchAllBuildingsFailure(err.message)));
};
