import axios from 'axios';

import {
    ARCHIVE_FLOOR_REQUEST,
    ARCHIVE_FLOOR_SUCCESS,
    ARCHIVE_FLOOR_FAILURE
} from 'constants/actionTypes/floors';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';

export const archiveFloorRequest = () => ({
    type: ARCHIVE_FLOOR_REQUEST
});

export const archiveFloorSuccess = id => ({
    type: ARCHIVE_FLOOR_SUCCESS,
    id
});

export const archiveFloorFailure = error => ({
    type: ARCHIVE_FLOOR_FAILURE,
    error
});

export default floorID => dispatch => {
    dispatch(archiveFloorRequest());
    return axios
        .post(`${API_URL}/floors/${floorID}`, null, getHeaders())
        .then(() => dispatch(archiveFloorSuccess(floorID)))
        .catch(err => dispatch(archiveFloorFailure(err.message)));
};
