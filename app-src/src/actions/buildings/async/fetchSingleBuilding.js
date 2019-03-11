import axios from 'axios';

import {
    FETCH_SINGLE_BUILDING_REQUEST,
    FETCH_SINGLE_BUILDING_SUCCESS,
    FETCH_SINGLE_BUILDING_FAILURE
} from 'constants/actionTypes/sites';

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

export default () => dispatch => {
    dispatch(fetchBuildingRequest());

    axios
        .get('/mockData/buildings/singleBuilding.json')
        .then(res => dispatch(fetchBuildingSuccess(res.data)))
        .catch(err => dispatch(fetchBuildingFailure(err)));
};
