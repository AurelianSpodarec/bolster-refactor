import axios from 'axios';

import {
    RESTORE_BUILDING_REQUEST,
    RESTORE_BUILDING_SUCCESS,
    RESTORE_BUILDING_FAILURE
} from 'constants/actionTypes/deletedData';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';

export const restoreBuildingRequest = () => ({
    type: RESTORE_BUILDING_REQUEST
});

export const restoreBuildingSuccess = id => ({
    type: RESTORE_BUILDING_SUCCESS,
    id
});

export const restoreBuildingFailure = error => ({
    type: RESTORE_BUILDING_FAILURE,
    error
});

export default buildingID => dispatch => {
    dispatch(restoreBuildingRequest());
    return axios
        .delete(`${API_URL}/buildings/${buildingID}?undo=true`, getHeaders())
        .then(() => dispatch(restoreBuildingSuccess(buildingID)))
        .catch(err => dispatch(restoreBuildingFailure(err.message)));
};
