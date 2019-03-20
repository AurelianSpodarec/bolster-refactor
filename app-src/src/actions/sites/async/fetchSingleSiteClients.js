import axios from 'axios';

import {
    FETCH_CLIENTS_REQUEST,
    FETCH_CLIENTS_SUCCESS,
    FETCH_CLIENTS_FAILURE
} from 'constants/actionTypes/sites';

export const fetchClientsRequest = () => ({
    type: FETCH_CLIENTS_REQUEST
});

export const fetchClientsSuccess = payload => ({
    type: FETCH_CLIENTS_SUCCESS,
    payload
});

export const fetchClientsFailure = error => ({
    type: FETCH_CLIENTS_FAILURE,
    error
});

export default () => dispatch => {
    dispatch(fetchClientsRequest());

    axios
        .get('/mockData/sites/clients.json')
        .then(res => dispatch(fetchClientsSuccess(res.data)))
        .catch(err => dispatch(fetchClientsFailure(err.message)));
};
