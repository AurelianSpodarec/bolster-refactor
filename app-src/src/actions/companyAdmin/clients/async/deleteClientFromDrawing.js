import axios from 'axios';

import {
    DELETE_CLIENT_FROM_DRAWING_REQUEST,
    DELETE_CLIENT_FROM_DRAWING_SUCCESS,
    DELETE_CLIENT_FROM_DRAWING_FAILURE
} from 'constants/actionTypes/clients';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';

export const deleteClientFromDrawingRequest = () => ({
    type: DELETE_CLIENT_FROM_DRAWING_REQUEST
});

export const deleteClientFromDrawingSuccess = id => ({
    type: DELETE_CLIENT_FROM_DRAWING_SUCCESS,
    id
});

export const deleteClientFromDrawingFailure = error => ({
    type: DELETE_CLIENT_FROM_DRAWING_FAILURE,
    error
});

export default clientID => dispatch => {
    dispatch(deleteClientFromDrawingRequest());
    axios
        .delete(`${API_URL}/clientpermissions/${clientID}`, getHeaders())
        .then(() => dispatch(deleteClientFromDrawingSuccess(clientID)))
        .catch(err => dispatch(deleteClientFromDrawingFailure(err.message)));
};
