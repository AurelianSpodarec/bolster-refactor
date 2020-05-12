import axios from 'axios';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import {
    FETCH_SERVICE_PERMISSIONS_FOR_DRAWING_REQUEST,
    FETCH_SERVICE_PERMISSIONS_FOR_DRAWING_SUCCESS,
    FETCH_SERVICE_PERMISSIONS_FOR_DRAWING_FAILURE
} from 'constants/actionTypes/services';

export const fetchServicePermissionsForDrawingRequest = () => ({
    type: FETCH_SERVICE_PERMISSIONS_FOR_DRAWING_REQUEST
});

export const fetchServicePermissionsForDrawingSuccess = payload => ({
    type: FETCH_SERVICE_PERMISSIONS_FOR_DRAWING_SUCCESS,
    payload
});

export const fetchServicePermissionsForDrawingFailure = error => ({
    type: FETCH_SERVICE_PERMISSIONS_FOR_DRAWING_FAILURE,
    error
});

export default drawingID => dispatch => {
    dispatch(fetchServicePermissionsForDrawingRequest());

    return axios
        .get(`${API_URL}/users/${drawingID}/drawings/permissions`, getHeaders())
        .then(res => dispatch(fetchServicePermissionsForDrawingSuccess(res.data)))
        .catch(err => dispatch(fetchServicePermissionsForDrawingFailure(err.message)));
};
