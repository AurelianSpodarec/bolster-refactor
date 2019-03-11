import axios from 'axios';

import {
    FETCH_SINGLE_PIN_REQUEST,
    FETCH_SINGLE_PIN_SUCCESS,
    FETCH_SINGLE_PIN_FAILURE
} from 'constants/pins';

export const fetchSinglePinRequest = () => ({
    type: FETCH_SINGLE_PIN_REQUEST
});

export const fetchSinglePinSuccess = payload => ({
    type: FETCH_SINGLE_PIN_SUCCESS,
    payload
});

export const fetchSinglePinFailure = error => ({
    type: FETCH_SINGLE_PIN_FAILURE,
    error
});

export default () => dispatch => {
    dispatch(fetchSinglePinRequest());

    axios
        .get('/mockData/pins/singlePin.json')
        .then(res => dispatch(fetchSinglePinSuccess(res.data)))
        .catch(err => dispatch(fetchSinglePinFailure(err.message)));
};
