import axios from 'axios';

import {
    DELETE_BUILDING_REQUEST,
    DELETE_BUILDING_SUCCESS,
    DELETE_BUILDING_FAILURE
} from 'constants/actionTypes/buildings';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';

export const deleteBuildingRequest = () => ({
    type: DELETE_BUILDING_REQUEST
});

export const deleteBuildingSuccess = id => ({
    type: DELETE_BUILDING_SUCCESS,
    id
});

export const deleteBuildingFailure = error => ({
    type: DELETE_BUILDING_FAILURE,
    error
});

export default buildingID => dispatch => {
    dispatch(deleteBuildingRequest());
    return axios
        .delete(`${API_URL}/buildings/${buildingID}`, getHeaders())
        .then(() => dispatch(deleteBuildingSuccess(buildingID)))
        .catch(err => dispatch(deleteBuildingFailure(err.message)));
};
