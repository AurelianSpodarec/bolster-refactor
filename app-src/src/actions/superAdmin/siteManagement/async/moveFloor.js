import axios from 'axios';

import {
    ADMIN_MOVE_FLOOR_REQUEST,
    ADMIN_MOVE_FLOOR_SUCCESS,
    ADMIN_MOVE_FLOOR_FAILURE
} from 'constants/actionTypes/siteManagement';
import { ADMIN_API_URL } from 'config';
import setAPIFieldErrors from 'actions/shared/generic/fieldErrors/sync/setAPIFieldErrors';
import { getHeaders } from 'helpers/api';

export const adminMoveFloorRequest = () => ({
    type: ADMIN_MOVE_FLOOR_REQUEST
});

export const adminMoveFloorSuccess = payload => ({
    type: ADMIN_MOVE_FLOOR_SUCCESS,
    payload
});

export const adminMoveFloorFailure = error => ({
    type: ADMIN_MOVE_FLOOR_FAILURE,
    error
});

export default (floorID, buildingID, postBody) => dispatch => {
    dispatch(adminMoveFloorRequest());

    return axios
        .post(
            `${ADMIN_API_URL}/floors/${floorID}/move/${buildingID}`,
            postBody,
            getHeaders()
        )
        .then(result => dispatch(adminMoveFloorSuccess(result.data)))
        .catch(error => {
            dispatch(adminMoveFloorFailure(error));
            if (error.response.status === 400)
                dispatch(setAPIFieldErrors(error.response.data.errors));
        });
};
