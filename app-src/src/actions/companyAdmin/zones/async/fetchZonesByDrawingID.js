import axios from 'axios';

import {
    FETCH_DRAWING_ZONES_REQUEST,
    FETCH_DRAWING_ZONES_SUCCESS,
    FETCH_DRAWING_ZONES_FAILURE,
} from 'constants/actionTypes/zones';

import { API_URL } from 'config';
import { getHeaders, handleErrors } from 'helpers/api';

export const fetchDrawingZoneRequest = () => ({
    type: FETCH_DRAWING_ZONES_REQUEST,
});

export const fetchDrawingZoneSuccess = payload => ({
    type: FETCH_DRAWING_ZONES_SUCCESS,
    payload,
});

export const fetchDrawingZoneFailure = error => ({
    type: FETCH_DRAWING_ZONES_FAILURE,
    error,
});

export default drawingID => dispatch => {
    dispatch(fetchDrawingZoneRequest());
    return axios
        .get(`${API_URL}/drawings/${drawingID}/zones`, getHeaders())
        .then(({ data }) => dispatch(fetchDrawingZoneSuccess(data)))
        .catch(err => dispatch(handleErrors(fetchDrawingZoneFailure)(err)));
};
