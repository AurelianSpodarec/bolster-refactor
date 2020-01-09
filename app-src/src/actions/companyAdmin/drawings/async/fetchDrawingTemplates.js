import axios from 'axios';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import {
    FETCH_DRAWING_TEMPLATES_REQUEST,
    FETCH_DRAWING_TEMPLATES_SUCCESS,
    FETCH_DRAWING_TEMPLATES_FAILURE
} from 'constants/actionTypes/drawings';

export const fetchDrawingTemplatesRequest = () => ({
    type: FETCH_DRAWING_TEMPLATES_REQUEST
});

export const fetchDrawingTemplatesSuccess = payload => ({
    type: FETCH_DRAWING_TEMPLATES_SUCCESS,
    payload
});

export const fetchDrawingTemplatesFailure = error => ({
    type: FETCH_DRAWING_TEMPLATES_FAILURE,
    error
});

export default drawingID => dispatch => {
    dispatch(fetchDrawingTemplatesRequest());

    return axios
        .get(`${API_URL}/drawings/${drawingID}/usabletemplates`, getHeaders())
        .then(res => dispatch(fetchDrawingTemplatesSuccess(res.data)))
        .catch(err => dispatch(fetchDrawingTemplatesFailure(err.message)));
};
