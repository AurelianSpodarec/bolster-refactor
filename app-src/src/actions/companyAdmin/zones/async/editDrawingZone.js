import axios from 'axios';

import {
    EDIT_DRAWING_ZONE_REQUEST,
    EDIT_DRAWING_ZONE_SUCCESS,
    EDIT_DRAWING_ZONE_FAILURE,
} from 'constants/actionTypes/zones';

import { API_URL } from 'config';
import { getHeaders, handleErrors } from 'helpers/api';

export const editDrawingZoneRequest = () => ({
    type: EDIT_DRAWING_ZONE_REQUEST,
});

export const editDrawingZoneSuccess = payload => ({
    type: EDIT_DRAWING_ZONE_SUCCESS,
    payload,
    successs: true,
});

export const editDrawingZoneFailure = error => ({
    type: EDIT_DRAWING_ZONE_FAILURE,
    error,
    success: false,
});

export default (drawingID, zoneID, postBody) => dispatch => {
    dispatch(editDrawingZoneRequest());

    return axios
        .post(`${API_URL}/drawings/${drawingID}/zones/${zoneID}`, postBody, getHeaders())
        .then(({ data }) => dispatch(editDrawingZoneSuccess(data)))
        .catch(err => dispatch(handleErrors(editDrawingZoneFailure)(err)));
};
