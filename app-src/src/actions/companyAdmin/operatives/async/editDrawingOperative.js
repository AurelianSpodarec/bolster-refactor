import axios from 'axios';

import { API_URL } from 'config/index';
import setAPIFieldErrors from 'actions/shared/generic/fieldErrors/sync/setAPIFieldErrors';
import { getHeaders } from 'helpers/api';

import {
    EDIT_DRAWING_OPERATIVE_REQUEST,
    EDIT_DRAWING_OPERATIVE_SUCCESS,
    EDIT_DRAWING_OPERATIVE_FAILURE
} from 'constants/actionTypes/operatives';

export const editDrawingOperativeRequest = () => ({
    type: EDIT_DRAWING_OPERATIVE_REQUEST
});

export const editDrawingOperativeSuccess = payload => ({
    type: EDIT_DRAWING_OPERATIVE_SUCCESS,
    payload
});

export const editDrawingOperativeFailure = error => ({
    type: EDIT_DRAWING_OPERATIVE_FAILURE,
    error
});

export default (operativeID, postBody) => dispatch => {
    dispatch(editDrawingOperativeRequest());

    axios
        .post(
            `${API_URL}/operativepermissions/${operativeID}`,
            postBody,
            getHeaders()
        )
        .then(result => dispatch(editDrawingOperativeSuccess(result.data)))
        .catch(error => {
            dispatch(editDrawingOperativeFailure(error));
            if (error.response.status === 400)
                dispatch(setAPIFieldErrors(error.response.data.errors));
        });
};
