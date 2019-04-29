import axios from 'axios';

import {
    UPDATE_FLOOR_PLAN_REQUEST,
    UPDATE_FLOOR_PLAN_SUCCESS,
    UPDATE_FLOOR_PLAN_FAILURE
} from 'constants/actionTypes/drawings';
import { API_URL } from 'config';
import { getHeaders, handleErrors } from 'helpers/api';

const updateFloorPlanRequest = () => ({
    type: UPDATE_FLOOR_PLAN_REQUEST
});

const updateFloorPlanSuccess = payload => ({
    type: UPDATE_FLOOR_PLAN_SUCCESS,
    payload
});

const updateFloorPlanFailure = error => ({
    type: UPDATE_FLOOR_PLAN_FAILURE,
    error
});

export default (drawingID, postBody) => dispatch => {
    dispatch(updateFloorPlanRequest());

    axios
        .post(
            `${API_URL}/drawings/${drawingID}/floorplan`,
            postBody,
            getHeaders()
        )
        .then(() => dispatch(updateFloorPlanSuccess()))
        .catch(err => dispatch(handleErrors(updateFloorPlanFailure)(err)));
};
