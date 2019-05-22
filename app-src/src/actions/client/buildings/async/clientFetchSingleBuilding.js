import axios from 'axios';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import {
    CLIENT_FETCH_SINGLE_BUILDING_REQUEST,
    CLIENT_FETCH_SINGLE_BUILDING_SUCCESS,
    CLIENT_FETCH_SINGLE_BUILDING_FAILURE
} from 'constants/actionTypes/buildings';

export const clientFetchBuildingRequest = () => ({
    type: CLIENT_FETCH_SINGLE_BUILDING_REQUEST
});

export const clientFetchBuildingSuccess = payload => ({
    type: CLIENT_FETCH_SINGLE_BUILDING_SUCCESS,
    payload
});

export const clientFetchBuildingFailure = error => ({
    type: CLIENT_FETCH_SINGLE_BUILDING_FAILURE,
    error
});

export default id => dispatch => {
    dispatch(clientFetchBuildingRequest());
    return (
        axios
            // ! change the url
            .get(`${API_URL}/buildings/${id}`, getHeaders())
            .then(res => dispatch(clientFetchBuildingSuccess(res.data)))
            .catch(err => dispatch(clientFetchBuildingFailure(err.message)))
    );
};
