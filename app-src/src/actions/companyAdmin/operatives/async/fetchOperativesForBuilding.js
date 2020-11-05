import axios from 'axios';

import {
    FETCH_OPERATIVES_FOR_BUILDING_REQUEST,
    FETCH_OPERATIVES_FOR_BUILDING_SUCCESS,
    FETCH_OPERATIVES_FOR_BUILDING_FAILURE,
} from 'constants/actionTypes/operatives';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';

export const fetchOperativesBuildingRequest = () => ({
    type: FETCH_OPERATIVES_FOR_BUILDING_REQUEST,
});

export const fetchOperativesBuildingSuccess = payload => ({
    type: FETCH_OPERATIVES_FOR_BUILDING_SUCCESS,
    payload,
});

export const fetchOperativesBuildingFailure = error => ({
    type: FETCH_OPERATIVES_FOR_BUILDING_FAILURE,
    error,
});

export default buildingID => dispatch => {
    dispatch(fetchOperativesBuildingRequest());

    return axios
        .get(`${API_URL}/operativepermissions/building/${buildingID}`, getHeaders())
        .then(res => dispatch(fetchOperativesBuildingSuccess(res.data)))
        .catch(err => dispatch(fetchOperativesBuildingFailure(err.message)));
};
