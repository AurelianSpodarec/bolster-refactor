import axios from 'axios';

import {
    ARCHIVE_BUILDING_REQUEST,
    ARCHIVE_BUILDING_SUCCESS,
    ARCHIVE_BUILDING_FAILURE
} from 'constants/actionTypes/buildings';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';

export const archiveBuildingRequest = () => ({
    type: ARCHIVE_BUILDING_REQUEST
});

export const archiveBuildingSuccess = id => ({
    type: ARCHIVE_BUILDING_SUCCESS,
    id
});

export const archiveBuildingFailure = error => ({
    type: ARCHIVE_BUILDING_FAILURE,
    error
});

export default buildingID => dispatch => {
    dispatch(archiveBuildingRequest());
    return axios
        .post(`${API_URL}/buildings/${buildingID}`, null, getHeaders())
        .then(({ data }) => dispatch(archiveBuildingSuccess(data)))
        .catch(err => dispatch(archiveBuildingFailure(err.message)));
};
