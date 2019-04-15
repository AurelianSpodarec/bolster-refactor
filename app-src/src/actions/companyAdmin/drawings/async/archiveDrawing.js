import axios from 'axios';

import {
    ARCHIVE_DRAWING_REQUEST,
    ARCHIVE_DRAWING_SUCCESS,
    ARCHIVE_DRAWING_FAILURE
} from 'constants/actionTypes/drawings';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';

export const archiveDrawingRequest = () => ({
    type: ARCHIVE_DRAWING_REQUEST
});

export const archiveDrawingSuccess = id => ({
    type: ARCHIVE_DRAWING_SUCCESS,
    id
});

export const archiveDrawingFailure = error => ({
    type: ARCHIVE_DRAWING_FAILURE,
    error
});

export default drawingID => dispatch => {
    dispatch(archiveDrawingRequest());
    return axios
        .post(`${API_URL}/drawings/${drawingID}`, null, getHeaders())
        .then(() => dispatch(archiveDrawingSuccess(drawingID)))
        .catch(err => dispatch(archiveDrawingFailure(err.message)));
};
