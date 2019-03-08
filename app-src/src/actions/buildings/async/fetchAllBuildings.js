import axios from 'axios';

import {
    FETCH_ALL_BUILDINGS_REQUEST,
    FETCH_ALL_BUILDINGS_SUCCESS,
    FETCH_ALL_BUILDINGS_FAILURE
} from 'constants/actionTypes/buildings';

export const fetchAllSitesRequest = () => ({
    type: FETCH_ALL_BUILDINGS_REQUEST
});

export const fetchAllSitesSuccess = payload => ({
    type: FETCH_ALL_BUILDINGS_SUCCESS,
    payload
});

export const fetchAllSitesFailure = error => ({
    type: FETCH_ALL_BUILDINGS_FAILURE,
    error
});

export default () => dispatch => {
    dispatch(fetchAllSitesRequest());

    axios
        .get('/mockData/buildings/allBuildings.json')
        .then(res => dispatch(fetchAllSitesSuccess(res.data)))
        .catch(err => dispatch(fetchAllSitesFailure(err)));
};
