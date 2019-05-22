import axios from 'axios';
import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';

import {
    CLIENT_FETCH_ALL_BUILDINGS_REQUEST,
    CLIENT_FETCH_ALL_BUILDINGS_SUCCESS,
    CLIENT_FETCH_ALL_BUILDINGS_FAILURE
} from 'constants/actionTypes/buildings';

export const clientFetchAllBuildingsRequest = () => ({
    type: CLIENT_FETCH_ALL_BUILDINGS_REQUEST
});

export const clientFetchAllBuildingsSuccess = payload => ({
    type: CLIENT_FETCH_ALL_BUILDINGS_SUCCESS,
    payload
});

export const clientFetchAllBuildingsFailure = error => ({
    type: CLIENT_FETCH_ALL_BUILDINGS_FAILURE,
    error
});

export default () => dispatch => {
    dispatch(clientFetchAllBuildingsRequest());

    axios
        // ! change the url
        .get(`${API_URL}/buildings`, getHeaders())
        .then(res => dispatch(clientFetchAllBuildingsSuccess(res.data)))
        .catch(err => dispatch(clientFetchAllBuildingsFailure(err.message)));
};
