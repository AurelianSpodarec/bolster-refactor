import axios from 'axios';
import { API_URL } from 'config/index';

import setAPIFieldErrors from 'actions/shared/generic/fieldErrors/sync/setAPIFieldErrors';
import { getHeaders } from 'helpers/api';
import {
    CREATE_BUILDINGS_REQUEST,
    CREATE_BUILDINGS_SUCCESS,
    CREATE_BUILDINGS_FAILURE
} from 'constants/actionTypes/buildings';

export const createBuildingsRequest = () => ({
    type: CREATE_BUILDINGS_REQUEST
});

export const createBuildingsSuccess = payload => ({
    type: CREATE_BUILDINGS_SUCCESS,
    payload
});

export const createBuildingsFailure = error => ({
    type: CREATE_BUILDINGS_FAILURE,
    error
});

export default postBody => dispatch => {
    dispatch(createBuildingsRequest());

    axios
        .post(`${API_URL}/buildings/multiple`, postBody, getHeaders())
        .then(result => dispatch(createBuildingsSuccess(result.data)))
        .catch(error => {
            dispatch(createBuildingsFailure(error));
            if (error.response.status === 400)
                dispatch(setAPIFieldErrors(error.response.data.errors));
        });
};
