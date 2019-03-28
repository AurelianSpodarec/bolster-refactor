import axios from 'axios';

import { API_URL } from 'config/index';
import setAPIFieldErrors from 'actions/generic/fieldErrors/sync/setAPIFieldErrors';
import { getHeaders } from 'helpers/api';
import {
    CREATE_DRAWING_REQUEST,
    CREATE_DRAWING_SUCCESS,
    CREATE_DRAWING_FAILURE
} from 'constants/actionTypes/drawings';

export const createDrawingRequest = () => ({
    type: CREATE_DRAWING_REQUEST
});

export const createDrawingSuccess = payload => ({
    type: CREATE_DRAWING_SUCCESS,
    payload
});

export const createDrawingFailure = error => ({
    type: CREATE_DRAWING_FAILURE,
    error
});

export default drawing => dispatch => {
    dispatch(createDrawingRequest());
    axios
        .post(`${API_URL}/drawings`, drawing, getHeaders())
        .then(result => dispatch(createDrawingSuccess(result.data)))
        .catch(error => {
            dispatch(createDrawingFailure(error));
            if (error.response.status === 400)
                dispatch(setAPIFieldErrors(error.response.data.errors));
        });
};
