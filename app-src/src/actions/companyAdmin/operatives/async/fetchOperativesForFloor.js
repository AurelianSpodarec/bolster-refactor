import axios from 'axios';

import {
    FETCH_OPERATIVES_FOR_FLOOR_REQUEST,
    FETCH_OPERATIVES_FOR_FLOOR_SUCCESS,
    FETCH_OPERATIVES_FOR_FLOOR_FAILURE,
} from 'constants/actionTypes/operatives';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';

export const fetchOperativesFloorRequest = () => ({
    type: FETCH_OPERATIVES_FOR_FLOOR_REQUEST,
});

export const fetchOperativesFloorSuccess = payload => ({
    type: FETCH_OPERATIVES_FOR_FLOOR_SUCCESS,
    payload,
});

export const fetchOperativesFloorFailure = error => ({
    type: FETCH_OPERATIVES_FOR_FLOOR_FAILURE,
    error,
});

export default floorID => dispatch => {
    dispatch(fetchOperativesFloorRequest());

    return axios
        .get(`${API_URL}/operativepermissions/floor/${floorID}`, getHeaders())
        .then(res => dispatch(fetchOperativesFloorSuccess(res.data)))
        .catch(err => dispatch(fetchOperativesFloorFailure(err.message)));
};
