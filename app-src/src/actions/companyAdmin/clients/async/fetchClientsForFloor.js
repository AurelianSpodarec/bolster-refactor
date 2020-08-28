import axios from 'axios';

import {
    FETCH_CLIENTS_FOR_FLOOR_REQUEST,
    FETCH_CLIENTS_FOR_FLOOR_SUCCESS,
    FETCH_CLIENTS_FOR_FLOOR_FAILURE,
} from 'constants/actionTypes/clients';
import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';

export const fetchClientsForFloorRequest = () => ({
    type: FETCH_CLIENTS_FOR_FLOOR_REQUEST,
});

export const fetchClientsForFloorSuccess = payload => ({
    type: FETCH_CLIENTS_FOR_FLOOR_SUCCESS,
    payload,
});

export const fetchClientsForFloorFailure = error => ({
    type: FETCH_CLIENTS_FOR_FLOOR_FAILURE,
    error,
});

export default floorID => dispatch => {
    dispatch(fetchClientsForFloorRequest());

    return axios
        .get(`${API_URL}/ClientPermissions/floor/${floorID}`, getHeaders())
        .then(res => dispatch(fetchClientsForFloorSuccess(res.data)))
        .catch(err => dispatch(fetchClientsForFloorFailure(err.message)));
};
