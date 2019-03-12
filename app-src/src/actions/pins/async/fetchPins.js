import axios from 'axios';

import {
    FETCH_PINS_REQUEST,
    FETCH_PINS_SUCCESS,
    FETCH_PINS_FAILURE
} from 'constants/actionTypes/pins';

export const fetchPinsRequest = () => ({
    type: FETCH_PINS_REQUEST
});

export const fetchPinsSuccess = payload => ({
    type: FETCH_PINS_SUCCESS,
    payload
});

export const fetchPinsFailure = error => ({
    type: FETCH_PINS_FAILURE,
    error
});

export default () => dispatch => {
    dispatch(fetchPinsRequest());

    axios
        .get('/mockData/pins/pins.json')
        .then(res => dispatch(fetchPinsSuccess(res.data)))
        .catch(err => dispatch(fetchPinsFailure(err.message)));
};
