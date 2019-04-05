import axios from 'axios';

import {
    FETCH_OPERATIVES_REQUEST,
    FETCH_OPERATIVES_SUCCESS,
    FETCH_OPERATIVES_FAILURE
} from 'constants/actionTypes/operatives';
import { getHeaders } from 'helpers/api';
import { API_URL } from 'config';

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

export default drawingID => dispatch => {
    dispatch(fetchOperativesRequest());

    axios
        .get(`${API_URL}/operativepermissions/${drawingID}`, getHeaders())
        .then(res => dispatch(fetchOperativesSuccess(res.data)))
        .catch(err => dispatch(fetchOperativesFailure(err.message)));
};
