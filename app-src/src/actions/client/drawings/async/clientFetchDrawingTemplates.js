import axios from 'axios';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import {
    CLIENT_FETCH_DRAWING_TEMPLATES_REQUEST,
    CLIENT_FETCH_DRAWING_TEMPLATES_SUCCESS,
    CLIENT_FETCH_DRAWING_TEMPLATES_FAILURE
} from 'constants/client/actionTypes/clientDrawings';

export const clientFetchDrawingTemplatesRequest = () => ({
    type: CLIENT_FETCH_DRAWING_TEMPLATES_REQUEST
});

export const clientFetchDrawingTemplatesSuccess = payload => ({
    type: CLIENT_FETCH_DRAWING_TEMPLATES_SUCCESS,
    payload
});

export const clientFetchDrawingTemplatesFailure = error => ({
    type: CLIENT_FETCH_DRAWING_TEMPLATES_FAILURE,
    error
});

export default drawingID => dispatch => {
    dispatch(clientFetchDrawingTemplatesRequest());

    axios
        // ! change the url
        .get(`${API_URL}/drawings/${drawingID}/usabletemplates`, getHeaders())
        .then(res => dispatch(clientFetchDrawingTemplatesSuccess(res.data)))
        .catch(err =>
            dispatch(clientFetchDrawingTemplatesFailure(err.message))
        );
};
