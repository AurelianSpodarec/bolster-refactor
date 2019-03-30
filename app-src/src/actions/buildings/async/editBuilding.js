import axios from 'axios';

import { API_URL } from 'config/index';
import setAPIFieldErrors from 'actions/generic/fieldErrors/sync/setAPIFieldErrors';
import { getHeaders } from 'helpers/api';

import {
    EDIT_BUILDING_REQUEST,
    EDIT_BUILDING_SUCCESS,
    EDIT_BUILDING_FAILURE
} from 'constants/actionTypes/buildings';

export const editBuildingRequest = () => ({
    type: EDIT_BUILDING_REQUEST
});

export const editBuildingSuccess = payload => ({
    type: EDIT_BUILDING_SUCCESS,
    payload
});

export const editBuildingFailure = error => ({
    type: EDIT_BUILDING_FAILURE,
    error
});

export default (buildingID, postBody) => dispatch => {
    dispatch(editBuildingRequest());

    axios
        .post(`${API_URL}/building/${buildingID}`, postBody, getHeaders())
        .then(result => dispatch(editBuildingSuccess(result.data)))
        .catch(error => {
            dispatch(editBuildingFailure(error));
            if (error.response.status === 400)
                dispatch(setAPIFieldErrors(error.response.data.errors));
        });
};
