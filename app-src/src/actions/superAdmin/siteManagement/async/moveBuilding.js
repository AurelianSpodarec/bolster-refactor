import axios from 'axios';

import {
    ADMIN_MOVE_BUILDING_REQUEST,
    ADMIN_MOVE_BUILDING_SUCCESS,
    ADMIN_MOVE_BUILDING_FAILURE
} from 'constants/actionTypes/siteManagement';
import { ADMIN_API_URL } from 'config';
import setAPIFieldErrors from 'actions/shared/generic/fieldErrors/sync/setAPIFieldErrors';
import { getHeaders } from 'helpers/api';

export const adminMoveBuildingRequest = () => ({
    type: ADMIN_MOVE_BUILDING_REQUEST
});

export const adminMoveBuildingSuccess = (payload, buildingID) => ({
    type: ADMIN_MOVE_BUILDING_SUCCESS,
    payload,
    buildingID
});

export const adminMoveBuildingFailure = error => ({
    type: ADMIN_MOVE_BUILDING_FAILURE,
    error
});

export default (buildingID, siteID, postBody) => dispatch => {
    dispatch(adminMoveBuildingRequest());

    return axios
        .post(
            `${ADMIN_API_URL}/buildings/${buildingID}/move/${siteID}`,
            postBody,
            getHeaders()
        )
        .then(result =>
            dispatch(adminMoveBuildingSuccess(result.data, buildingID))
        )
        .catch(error => {
            dispatch(adminMoveBuildingFailure(error));
            if (error.response.status === 400)
                dispatch(setAPIFieldErrors(error.response.data.errors));
        });
};
