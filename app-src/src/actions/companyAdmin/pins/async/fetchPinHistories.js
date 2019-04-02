import axios from 'axios';

import {
    FETCH_PIN_HISTORIES_REQUEST,
    FETCH_PIN_HISTORIES_SUCCESS,
    FETCH_PIN_HISTORIES_FAILURE
} from 'constants/actionTypes/pins';

export const fetchPinHistoriesRequest = () => ({
    type: FETCH_PIN_HISTORIES_REQUEST
});

export const fetchPinHistoriesSuccess = payload => ({
    type: FETCH_PIN_HISTORIES_SUCCESS,
    payload
});

export const fetchPinHistoriesFailure = error => ({
    type: FETCH_PIN_HISTORIES_FAILURE,
    error
});

export default () => dispatch => {
    dispatch(fetchPinHistoriesRequest());

    axios
        .get('/mockData/pins/pinHistories.json')
        .then(res => dispatch(fetchPinHistoriesSuccess(res.data)))
        .catch(err => dispatch(fetchPinHistoriesFailure(err.message)));
};
