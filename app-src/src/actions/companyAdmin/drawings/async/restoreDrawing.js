import axios from 'axios';

import {
    RESTORE_DRAWING_REQUEST,
    RESTORE_DRAWING_SUCCESS,
    RESTORE_DRAWING_FAILURE
} from 'constants/actionTypes/deletedData';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';

export const restoreDrawingRequest = () => ({
    type: RESTORE_DRAWING_REQUEST
});

export const restoreDrawingSuccess = id => ({
    type: RESTORE_DRAWING_SUCCESS,
    id
});

export const restoreDrawingFailure = error => ({
    type: RESTORE_DRAWING_FAILURE,
    error
});

export default drawingID => dispatch => {
    dispatch(restoreDrawingRequest());
    return axios
        .delete(`${API_URL}/drawings/${drawingID}?undo=true`, getHeaders())
        .then(() => dispatch(restoreDrawingSuccess(drawingID)))
        .catch(err => dispatch(restoreDrawingFailure(err.message)));
};
