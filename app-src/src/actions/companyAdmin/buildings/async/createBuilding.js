import axios from 'axios';
import { API_URL } from 'config/index';

import setAPIFieldErrors from 'actions/shared/generic/fieldErrors/sync/setAPIFieldErrors';
import { getHeaders } from 'helpers/api';
import {
    CREATE_BUILDING_REQUEST,
    CREATE_BUILDING_SUCCESS,
    CREATE_BUILDING_FAILURE
} from 'constants/actionTypes/buildings';

export const createBuildingRequest = () => ({
    type: CREATE_BUILDING_REQUEST
});

export const createBuildingSuccess = payload => ({
    type: CREATE_BUILDING_SUCCESS,
    payload
});

export const createBuildingFailure = error => ({
    type: CREATE_BUILDING_FAILURE,
    error
});

export default postBody => dispatch => {
    dispatch(createBuildingRequest());

    axios
        .post(`${API_URL}/buildings`, postBody, getHeaders())
        .then(result => dispatch(createBuildingSuccess(result.data)))
        .catch(error => {
            dispatch(createBuildingFailure(error));
            if (error.response.status === 400)
                dispatch(setAPIFieldErrors(error.response.data.errors));
        });
};
