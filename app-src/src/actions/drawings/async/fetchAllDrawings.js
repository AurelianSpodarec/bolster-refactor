import axios from 'axios';

import {
    FETCH_ALL_DRAWINGS_REQUEST,
    FETCH_ALL_DRAWINGS_SUCCESS,
    FETCH_ALL_DRAWINGS_FAILURE
} from 'constants/actionTypes/drawings';

export const fetchAllDrawingsRequest = () => ({
    type: FETCH_ALL_DRAWINGS_REQUEST
});

export const fetchAllDrawingsSuccess = payload => ({
    type: FETCH_ALL_DRAWINGS_SUCCESS,
    payload
});

export const fetchAllDrawingsFailure = error => ({
    type: FETCH_ALL_DRAWINGS_FAILURE,
    error
});

export default () => dispatch => {
    dispatch(fetchAllDrawingsRequest());

    axios
        .get('/mockData/drawings/allDrawings.json')
        .then(res => dispatch(fetchAllDrawingsSuccess(res.data)))
        .catch(err => dispatch(fetchAllDrawingsFailure(err)));
};
