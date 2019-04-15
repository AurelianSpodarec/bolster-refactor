import axios from 'axios';

import {
    DELETE_FLOOR_REQUEST,
    DELETE_FLOOR_SUCCESS,
    DELETE_FLOOR_FAILURE
} from 'constants/actionTypes/floors';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';

export const deleteFloorRequest = () => ({
    type: DELETE_FLOOR_REQUEST
});

export const deleteFloorSuccess = id => ({
    type: DELETE_FLOOR_SUCCESS,
    id
});

export const deleteFloorFailure = error => ({
    type: DELETE_FLOOR_FAILURE,
    error
});

export default floorID => dispatch => {
    dispatch(deleteFloorRequest());
    return axios
        .delete(`${API_URL}/floors/${floorID}`, getHeaders())
        .then(() => dispatch(deleteFloorSuccess(floorID)))
        .catch(err => dispatch(deleteFloorFailure(err.message)));
};
