import axios from 'axios';

import { API_URL } from 'config/index';
import setAPIFieldErrors from 'actions/shared/generic/fieldErrors/sync/setAPIFieldErrors';
import { getHeaders } from 'helpers/api';
import {
    ADD_CREDITS_TO_DRAWING_REQUEST,
    ADD_CREDITS_TO_DRAWING_SUCCESS,
    ADD_CREDITS_TO_DRAWING_FAILURE
} from 'constants/actionTypes/drawings';

export const addCreditsToDrawingRequest = () => ({
    type: ADD_CREDITS_TO_DRAWING_REQUEST
});

export const addCreditsToDrawingSuccess = payload => ({
    type: ADD_CREDITS_TO_DRAWING_SUCCESS,
    payload
});

export const addCreditsToDrawingFailure = error => ({
    type: ADD_CREDITS_TO_DRAWING_FAILURE,
    error
});

export default (drawingID, postBody) => dispatch => {
    dispatch(addCreditsToDrawingRequest());
    axios
        .post(`${API_URL}/drawings/${drawingID}/extend`, postBody, getHeaders())
        .then(result => dispatch(addCreditsToDrawingSuccess(result.data)))
        .catch(error => {
            dispatch(addCreditsToDrawingFailure(error));
            if (error.response.status === 400)
                dispatch(setAPIFieldErrors(error.response.data.errors));
        });
};
