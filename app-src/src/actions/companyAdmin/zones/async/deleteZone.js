import axios from 'axios';

import {
    DELETE_DRAWING_ZONE_REQUEST,
    DELETE_DRAWING_ZONE_SUCCESS,
    DELETE_DRAWING_ZONE_FAILURE,
} from 'constants/actionTypes/zones';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';

export const deleteDrawingZoneRequest = () => ({
    type: DELETE_DRAWING_ZONE_REQUEST,
});

export const deleteDrawingZoneSuccess = zoneID => ({
    type: DELETE_DRAWING_ZONE_SUCCESS,
    zoneID,
    success: true,
});

export const deleteDrawingZoneFailure = error => ({
    type: DELETE_DRAWING_ZONE_FAILURE,
    error,
    success: false,
});

export default (drawingID, zoneID) => dispatch => {
    dispatch(deleteDrawingZoneRequest());

    return axios
        .delete(`${API_URL}/drawings/${drawingID}/zones/${zoneID}`, getHeaders())
        .then(() => dispatch(deleteDrawingZoneSuccess(zoneID)))
        .catch(err => dispatch(deleteDrawingZoneFailure(err.message)));
};
