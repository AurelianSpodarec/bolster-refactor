import axios from 'axios';

import {
    DELETE_DRAWING_REQUEST,
    DELETE_DRAWING_SUCCESS,
    DELETE_DRAWING_FAILURE
} from 'constants/actionTypes/drawings';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';

export const deleteDrawingRequest = () => ({
    type: DELETE_DRAWING_REQUEST
});

export const deleteDrawingSuccess = id => ({
    type: DELETE_DRAWING_SUCCESS,
    id
});

export const deleteDrawingFailure = error => ({
    type: DELETE_DRAWING_FAILURE,
    error
});

export default drawingID => dispatch => {
    dispatch(deleteDrawingRequest());
    return axios
        .delete(`${API_URL}/drawings/${drawingID}`, getHeaders())
        .then(() => dispatch(deleteDrawingSuccess(drawingID)))
        .catch(err => dispatch(deleteDrawingFailure(err.message)));
};
