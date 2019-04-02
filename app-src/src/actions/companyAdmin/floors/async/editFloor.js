import axios from 'axios';

import { API_URL } from 'config/index';
import setAPIFieldErrors from 'actions/shared/generic/fieldErrors/sync/setAPIFieldErrors';
import { getHeaders } from 'helpers/api';

import {
    EDIT_FLOOR_REQUEST,
    EDIT_FLOOR_SUCCESS,
    EDIT_FLOOR_FAILURE
} from 'constants/actionTypes/floors';

export const editFloorRequest = () => ({
    type: EDIT_FLOOR_REQUEST
});

export const editFloorSuccess = payload => ({
    type: EDIT_FLOOR_SUCCESS,
    payload
});

export const editFloorFailure = error => ({
    type: EDIT_FLOOR_FAILURE,
    error
});

export default (floorID, postBody) => dispatch => {
    dispatch(editFloorRequest());

    axios
        .post(`${API_URL}/floors/${floorID}`, postBody, getHeaders())
        .then(result => dispatch(editFloorSuccess(result.data)))
        .catch(error => {
            dispatch(editFloorFailure(error));
            if (error.response.status === 400)
                dispatch(setAPIFieldErrors(error.response.data.errors));
        });
};
