import axios from 'axios';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import {
    FETCH_ALL_PINS_FOR_DRAWING_REQUEST,
    FETCH_ALL_PINS_FOR_DRAWING_SUCCESS,
    FETCH_ALL_PINS_FOR_DRAWING_FAILURE
} from 'constants/actionTypes/pins';

export const fetchAllPinsForDrawingRequest = excludingPinID => ({
    type: FETCH_ALL_PINS_FOR_DRAWING_REQUEST,
    excludingPinID
});

export const fetchAllPinsForDrawingSuccess = payload => ({
    type: FETCH_ALL_PINS_FOR_DRAWING_SUCCESS,
    payload
});

export const fetchAllPinsForDrawingFailure = error => ({
    type: FETCH_ALL_PINS_FOR_DRAWING_FAILURE,
    error
});

export default (id, excludingPinID) => dispatch => {
    dispatch(fetchAllPinsForDrawingRequest(excludingPinID));

    return axios
        .get(`${API_URL}/pins/drawing/${id}`, getHeaders())
        .then(res => dispatch(fetchAllPinsForDrawingSuccess(res.data)))
        .catch(err => dispatch(fetchAllPinsForDrawingFailure(err.message)));
};
