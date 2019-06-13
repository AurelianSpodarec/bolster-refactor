import axios from 'axios';

import {
    EDIT_DRAWING_REQUEST,
    EDIT_DRAWING_SUCCESS,
    EDIT_DRAWING_FAILURE
} from 'constants/actionTypes/drawings';
import { API_URL } from 'config';
import { getHeaders, handleErrors } from 'helpers/api';

const editDrawingRequest = () => ({
    type: EDIT_DRAWING_REQUEST
});

const editDrawingSuccess = payload => ({
    type: EDIT_DRAWING_SUCCESS,
    payload
});

const editDrawingFailure = error => ({
    type: EDIT_DRAWING_FAILURE,
    error
});

export default (drawingID, postBody) => dispatch => {
    dispatch(editDrawingRequest());

    axios
        .post(`${API_URL}/drawings/${drawingID}`, postBody, getHeaders())
        .then(() => dispatch(editDrawingSuccess()))
        .catch(err => dispatch(handleErrors(editDrawingFailure)(err)));
};
