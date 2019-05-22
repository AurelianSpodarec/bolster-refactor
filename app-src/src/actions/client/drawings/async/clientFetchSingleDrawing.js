import axios from 'axios';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import {
    CLIENT_FETCH_SINGLE_DRAWING_REQUEST,
    CLIENT_FETCH_SINGLE_DRAWING_SUCCESS,
    CLIENT_FETCH_SINGLE_DRAWING_FAILURE
} from 'constants/client/actionTypes/clientDrawings';

export const clientFetchDrawingRequest = () => ({
    type: CLIENT_FETCH_SINGLE_DRAWING_REQUEST
});

export const clientFetchDrawingSuccess = payload => ({
    type: CLIENT_FETCH_SINGLE_DRAWING_SUCCESS,
    payload
});

export const clientFetchDrawingFailure = error => ({
    type: CLIENT_FETCH_SINGLE_DRAWING_FAILURE,
    error
});

export default id => dispatch => {
    dispatch(clientFetchDrawingRequest());

    axios
        // ! change the url
        .get(`${API_URL}/drawings/${id}`, getHeaders())
        .then(({ data }) => dispatch(clientFetchDrawingSuccess(data)))
        .catch(err => dispatch(clientFetchDrawingFailure(err.message)));
};
