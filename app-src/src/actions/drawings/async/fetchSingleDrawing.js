import axios from 'axios';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import {
    FETCH_SINGLE_DRAWING_REQUEST,
    FETCH_SINGLE_DRAWING_SUCCESS,
    FETCH_SINGLE_DRAWING_FAILURE
} from 'constants/actionTypes/drawings';

export const fetchDrawingRequest = () => ({
    type: FETCH_SINGLE_DRAWING_REQUEST
});

export const fetchDrawingSuccess = payload => ({
    type: FETCH_SINGLE_DRAWING_SUCCESS,
    payload
});

export const fetchDrawingFailure = error => ({
    type: FETCH_SINGLE_DRAWING_FAILURE,
    error
});

export default id => dispatch => {
    dispatch(fetchDrawingRequest());

    axios
        .get(`${API_URL}/drawings/${id}`, getHeaders())
        .then(res => dispatch(fetchDrawingSuccess(res.data)))
        .catch(err => dispatch(fetchDrawingFailure(err.message)));
};
