import axios from 'axios';
import { CLIENT_API_URL } from 'config/index';
import { getHeaders } from 'helpers/api';

import {
    CLIENT_FETCH_ALL_BUILDINGS_REQUEST,
    CLIENT_FETCH_ALL_BUILDINGS_SUCCESS,
    CLIENT_FETCH_ALL_BUILDINGS_FAILURE
} from 'constants/client/actionTypes/clientBuildings';

export const clientFetchAllBuildingsRequest = () => ({
    type: CLIENT_FETCH_ALL_BUILDINGS_REQUEST
});

export const clientFetchAllBuildingsSuccess = payload => ({
    type: CLIENT_FETCH_ALL_BUILDINGS_SUCCESS,
    payload
});

export const clientFetchAllBuildingsFailure = error => ({
    type: CLIENT_FETCH_ALL_BUILDINGS_FAILURE,
    error
});

export default companyID => dispatch => {
    dispatch(clientFetchAllBuildingsRequest());

    axios
        .get(`${CLIENT_API_URL}/buildings/${companyID}`, getHeaders())
        .then(res => dispatch(clientFetchAllBuildingsSuccess(res.data)))
        .catch(err => dispatch(clientFetchAllBuildingsFailure(err.message)));
};
