import axios from 'axios';

import {
    FETCH_ALL_FLOORS_REQUEST,
    FETCH_ALL_FLOORS_SUCCESS,
    FETCH_ALL_FLOORS_FAILURE
} from 'constants/actionTypes/floors';

export const fetchAllFloorsRequest = () => ({
    type: FETCH_ALL_FLOORS_REQUEST
});

export const fetchAllFloorsSuccess = payload => ({
    type: FETCH_ALL_FLOORS_SUCCESS,
    payload
});

export const fetchAllFloorsFailure = error => ({
    type: FETCH_ALL_FLOORS_FAILURE,
    error
});

export default () => dispatch => {
    dispatch(fetchAllFloorsRequest());

    axios
        .get('/mockData/floors/allFloors.json')
        .then(res => dispatch(fetchAllFloorsSuccess(res.data)))
        .catch(err => dispatch(fetchAllFloorsFailure(err)));
};
