import axios from 'axios';

import {
    FETCH_CLIENTS_FOR_DRAWING_REQUEST,
    FETCH_CLIENTS_FOR_DRAWING_SUCCESS,
    FETCH_CLIENTS_FOR_DRAWING_FAILURE
} from 'constants/actionTypes/clients';
import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';

export const fetchClientsForDrawingRequest = () => ({
    type: FETCH_CLIENTS_FOR_DRAWING_REQUEST
});

export const fetchClientsForDrawingSuccess = payload => ({
    type: FETCH_CLIENTS_FOR_DRAWING_SUCCESS,
    payload
});

export const fetchClientsForDrawingFailure = error => ({
    type: FETCH_CLIENTS_FOR_DRAWING_FAILURE,
    error
});

export default drawingID => dispatch => {
    dispatch(fetchClientsForDrawingRequest());

    return axios
        .get(`${API_URL}/ClientPermissions/${drawingID}`, getHeaders())
        .then(res => dispatch(fetchClientsForDrawingSuccess(res.data)))
        .catch(err => dispatch(fetchClientsForDrawingFailure(err.message)));
};
