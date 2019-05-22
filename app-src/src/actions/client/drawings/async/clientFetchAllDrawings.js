import axios from 'axios';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import {
    CLIENT_FETCH_ALL_DRAWINGS_REQUEST,
    CLIENT_FETCH_ALL_DRAWINGS_SUCCESS,
    CLIENT_FETCH_ALL_DRAWINGS_FAILURE
} from 'constants/client/actionTypes/clientDrawings';

export const clientFetchAllDrawingsRequest = () => ({
    type: CLIENT_FETCH_ALL_DRAWINGS_REQUEST
});

export const clientFetchAllDrawingsSuccess = payload => ({
    type: CLIENT_FETCH_ALL_DRAWINGS_SUCCESS,
    payload
});

export const clientFetchAllDrawingsFailure = error => ({
    type: CLIENT_FETCH_ALL_DRAWINGS_FAILURE,
    error
});

export default () => dispatch => {
    dispatch(clientFetchAllDrawingsRequest());

    axios
        // ! change the url
        .get(`${API_URL}/drawings`, getHeaders())
        .then(res => dispatch(clientFetchAllDrawingsSuccess(res.data)))
        .catch(err => dispatch(clientFetchAllDrawingsFailure(err.message)));
};
