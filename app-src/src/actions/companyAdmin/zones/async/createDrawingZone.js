import axios from 'axios';

import {
    CREATE_DRAWING_ZONE_REQUEST,
    CREATE_DRAWING_ZONE_SUCCESS,
    CREATE_DRAWING_ZONE_FAILURE
} from 'constants/actionTypes/zones';

import { API_URL } from 'config';
import { getHeaders, handleErrors } from 'helpers/api';

export const createDrawingZoneRequest = () => ({
    type: CREATE_DRAWING_ZONE_REQUEST
});

export const createDrawingZoneSuccess = payload => ({
    type: CREATE_DRAWING_ZONE_SUCCESS,
    payload
});

export const createDrawingZoneFailure = error => ({
    type: CREATE_DRAWING_ZONE_FAILURE,
    error
});

export default (drawingID, postBody) => dispatch => {
    dispatch(createDrawingZoneRequest());

    return axios
        .post(`${API_URL}/drawings/${drawingID}/zones`, postBody, getHeaders())
        .then(({ data }) => dispatch(createDrawingZoneSuccess(data)))
        .catch(err => dispatch(handleErrors(createDrawingZoneFailure)(err)));
};
