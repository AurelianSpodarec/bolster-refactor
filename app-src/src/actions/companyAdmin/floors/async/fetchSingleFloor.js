import axios from 'axios';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import {
    FETCH_SINGLE_FLOOR_REQUEST,
    FETCH_SINGLE_FLOOR_SUCCESS,
    FETCH_SINGLE_FLOOR_FAILURE
} from 'constants/actionTypes/floors';

export const fetchSingleFloorRequest = () => ({
    type: FETCH_SINGLE_FLOOR_REQUEST
});

export const fetchSingleFloorSuccess = payload => ({
    type: FETCH_SINGLE_FLOOR_SUCCESS,
    payload
});

export const fetchSingleFloorFailure = error => ({
    type: FETCH_SINGLE_FLOOR_FAILURE,
    error
});

export default id => dispatch => {
    dispatch(fetchSingleFloorRequest());

    return axios
        .get(`${API_URL}/floors/${id}`, getHeaders())
        .then(res => dispatch(fetchSingleFloorSuccess(res.data)))
        .catch(err => dispatch(fetchSingleFloorFailure(err.message)));
};
