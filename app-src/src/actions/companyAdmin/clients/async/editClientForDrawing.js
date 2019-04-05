import Axios from 'axios';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import setAPIFieldErrors from 'actions/shared/generic/fieldErrors/sync/setAPIFieldErrors';
import {
    EDIT_CLIENT_FOR_DRAWING_REQUEST,
    EDIT_CLIENT_FOR_DRAWING_SUCCESS,
    EDIT_CLIENT_FOR_DRAWING_FAILURE
} from 'constants/actionTypes/clients';

export const editClientRequest = () => ({
    type: EDIT_CLIENT_FOR_DRAWING_REQUEST
});

export const editClientSuccess = payload => ({
    type: EDIT_CLIENT_FOR_DRAWING_SUCCESS,
    payload
});

export const editClientFailure = error => ({
    type: EDIT_CLIENT_FOR_DRAWING_FAILURE,
    error
});

export default (DrawingID, postBody) => dispatch => {
    dispatch(editClientRequest());
    return Axios.post(
        `${API_URL}/clientpermissions/${DrawingID}`,
        postBody,
        getHeaders()
    )
        .then(res => dispatch(editClientSuccess(res.data)))
        .catch(err => {
            dispatch(editClientFailure(err.message));
            if (err.response.status === 400) {
                dispatch(setAPIFieldErrors(err.response.data.errors));
            }
        });
};
