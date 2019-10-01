import axios from 'axios';

import {
    RESTORE_FLOOR_REQUEST,
    RESTORE_FLOOR_SUCCESS,
    RESTORE_FLOOR_FAILURE
} from 'constants/actionTypes/deletedData';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';

export const restoreFloorRequest = () => ({
    type: RESTORE_FLOOR_REQUEST
});

export const restoreFloorSuccess = id => ({
    type: RESTORE_FLOOR_SUCCESS,
    id
});

export const restoreFloorFailure = error => ({
    type: RESTORE_FLOOR_FAILURE,
    error
});

export default floorID => dispatch => {
    dispatch(restoreFloorRequest());
    return axios
        .delete(`${API_URL}/floors/${floorID}?undo=true`, getHeaders())
        .then(() => dispatch(restoreFloorSuccess(floorID)))
        .catch(err => dispatch(restoreFloorFailure(err.message)));
};
