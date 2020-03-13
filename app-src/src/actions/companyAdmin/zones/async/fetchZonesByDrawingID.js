import axios from 'axios';

import {
    FETCH_DRAWING_ZONES_REQUEST,
    FETCH_DRAWING_ZONES_SUCCESS,
    FETCH_DRAWING_ZONES_FAILURE
} from 'constants/actionTypes/zones';

import { API_URL } from 'config';
import { getHeaders, handleErrors } from 'helpers/api';

export const createDrawingZoneRequest = () => ({
    type: FETCH_DRAWING_ZONES_REQUEST
});

export const createDrawingZoneSuccess = payload => ({
    type: FETCH_DRAWING_ZONES_SUCCESS,
    payload
});

export const createDrawingZoneFailure = error => ({
    type: FETCH_DRAWING_ZONES_FAILURE,
    error
});

export default drawingID => dispatch => {
    dispatch(createDrawingZoneRequest());
    return axios
        .get(`${API_URL}/drawings/${drawingID}/zones`, getHeaders())
        .then(({ data }) => dispatch(createDrawingZoneSuccess(data)))
        .catch(err => dispatch(handleErrors(createDrawingZoneFailure)(err)));
};
