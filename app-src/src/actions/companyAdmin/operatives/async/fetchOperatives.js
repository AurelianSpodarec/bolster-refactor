import axios from 'axios';

import {
    FETCH_OPERATIVES_REQUEST,
    FETCH_OPERATIVES_SUCCESS,
    FETCH_OPERATIVES_FAILURE
} from 'constants/actionTypes/operatives';

export const fetchOperativesRequest = () => ({
    type: FETCH_OPERATIVES_REQUEST
});

export const fetchOperativesSuccess = payload => ({
    type: FETCH_OPERATIVES_SUCCESS,
    payload
});

export const fetchOperativesFailure = error => ({
    type: FETCH_OPERATIVES_FAILURE,
    error
});

export default () => dispatch => {
    dispatch(fetchOperativesRequest());

    axios
        .get('/mockData/operatives/operatives.json')
        .then(res => dispatch(fetchOperativesSuccess(res.data)))
        .catch(err => dispatch(fetchOperativesFailure(err.message)));
};
