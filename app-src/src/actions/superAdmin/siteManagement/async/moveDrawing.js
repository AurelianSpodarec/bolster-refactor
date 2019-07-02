import axios from 'axios';

import {
    ADMIN_MOVE_DRAWING_REQUEST,
    ADMIN_MOVE_DRAWING_SUCCESS,
    ADMIN_MOVE_DRAWING_FAILURE
} from 'constants/actionTypes/siteManagement';
import { ADMIN_API_URL } from 'config';
import setAPIFieldErrors from 'actions/shared/generic/fieldErrors/sync/setAPIFieldErrors';
import { getHeaders } from 'helpers/api';

export const adminMoveDrawingRequest = () => ({
    type: ADMIN_MOVE_DRAWING_REQUEST
});

export const adminMoveDrawingSuccess = (payload, drawingID) => ({
    type: ADMIN_MOVE_DRAWING_SUCCESS,
    payload,
    drawingID
});

export const adminMoveDrawingFailure = error => ({
    type: ADMIN_MOVE_DRAWING_FAILURE,
    error
});

export default (drawingID, floorID, postBody) => dispatch => {
    dispatch(adminMoveDrawingRequest());

    return axios
        .post(
            `${ADMIN_API_URL}/drawings/${drawingID}/move/${floorID}`,
            postBody,
            getHeaders()
        )
        .then(result =>
            dispatch(adminMoveDrawingSuccess(result.data, drawingID))
        )
        .catch(error => {
            dispatch(adminMoveDrawingFailure(error));
            if (error.response.status === 400)
                dispatch(setAPIFieldErrors(error.response.data.errors));
        });
};
