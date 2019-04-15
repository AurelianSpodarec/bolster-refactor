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

export const archiveBuildingSuccess = payload => ({
    type: ARCHIVE_BUILDING_SUCCESS,
    payload
});

export const archiveBuildingFailure = error => ({
    type: ARCHIVE_BUILDING_FAILURE,
    error
});

export default (buildingID, undo) => dispatch => {
    dispatch(archiveBuildingRequest());
    return axios
        .post(
            `${API_URL}/buildings/${buildingID}/archive${
                undo ? '?undo=true' : ''
            }`,
            null,
            getHeaders()
        )
        .then(({ data }) => dispatch(archiveBuildingSuccess(data)))
        .catch(err => dispatch(archiveBuildingFailure(err.message)));
};
