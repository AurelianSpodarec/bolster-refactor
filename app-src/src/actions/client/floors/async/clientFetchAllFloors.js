import axios from 'axios';

import { CLIENT_API_URL } from 'config/index';
import { getHeaders } from 'helpers/api';
import {
    CLIENT_FETCH_ALL_FLOORS_REQUEST,
    CLIENT_FETCH_ALL_FLOORS_SUCCESS,
    CLIENT_FETCH_ALL_FLOORS_FAILURE
} from 'constants/client/actionTypes/clientFloors';

export const clientFetchAllFloorsRequest = () => ({
    type: CLIENT_FETCH_ALL_FLOORS_REQUEST
});

export const clientFetchAllFloorsSuccess = payload => ({
    type: CLIENT_FETCH_ALL_FLOORS_SUCCESS,
    payload
});

export const clientFetchAllFloorsFailure = error => ({
    type: CLIENT_FETCH_ALL_FLOORS_FAILURE,
    error
});

export default companyID => dispatch => {
    dispatch(clientFetchAllFloorsRequest());

    axios
        .get(`${CLIENT_API_URL}/floors/${companyID}`, getHeaders())
        .then(res => dispatch(clientFetchAllFloorsSuccess(res.data)))
        .catch(err => dispatch(clientFetchAllFloorsFailure(err.message)));
};
