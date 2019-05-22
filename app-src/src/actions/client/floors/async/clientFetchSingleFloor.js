import axios from 'axios';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import {
    CLIENT_FETCH_SINGLE_FLOOR_REQUEST,
    CLIENT_FETCH_SINGLE_FLOOR_SUCCESS,
    CLIENT_FETCH_SINGLE_FLOOR_FAILURE
} from 'constants/actionTypes/floors';

export const clientFetchSingleFloorRequest = () => ({
    type: CLIENT_FETCH_SINGLE_FLOOR_REQUEST
});

export const clientFetchSingleFloorSuccess = payload => ({
    type: CLIENT_FETCH_SINGLE_FLOOR_SUCCESS,
    payload
});

export const clientFetchSingleFloorFailure = error => ({
    type: CLIENT_FETCH_SINGLE_FLOOR_FAILURE,
    error
});

export default id => dispatch => {
    dispatch(clientFetchSingleFloorRequest());

    return (
        axios
            // ! change this url
            .get(`${API_URL}/floors/${id}`, getHeaders())
            .then(res => dispatch(clientFetchSingleFloorSuccess(res.data)))
            .catch(err => dispatch(clientFetchSingleFloorFailure(err.message)))
    );
};
