import axios from 'axios';

import {
    DELETE_OPERATIVE_REQUEST,
    DELETE_OPERATIVE_SUCCESS,
    DELETE_OPERATIVE_FAILURE
} from 'constants/actionTypes/operatives';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';

export const deleteOperativeRequest = () => ({
    type: DELETE_OPERATIVE_REQUEST
});

export const deleteOperativeSuccess = id => ({
    type: DELETE_OPERATIVE_SUCCESS,
    id
});

export const deleteOperativeFailure = error => ({
    type: DELETE_OPERATIVE_FAILURE,
    error
});

export default (drawingID, operativeID) => dispatch => {
    dispatch(deleteOperativeRequest());
    axios
        .delete(
            `${API_URL}/operative/${drawingID}/${operativeID}`,
            getHeaders()
        )
        .then(() => dispatch(deleteOperativeSuccess(operativeID)))
        .catch(err => dispatch(deleteOperativeFailure(err.message)));
};
