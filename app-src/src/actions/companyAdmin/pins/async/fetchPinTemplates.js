import axios from 'axios';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import {
    FETCH_PIN_TEMPLATES_REQUEST,
    FETCH_PIN_TEMPLATES_SUCCESS,
    FETCH_PIN_TEMPLATES_FAILURE
} from 'constants/actionTypes/pins';

export const fetchPinTemplatesRequest = () => ({
    type: FETCH_PIN_TEMPLATES_REQUEST
});

export const fetchPinTemplatesSuccess = payload => ({
    type: FETCH_PIN_TEMPLATES_SUCCESS,
    payload
});

export const fetchPinTemplatesFailure = error => ({
    type: FETCH_PIN_TEMPLATES_FAILURE,
    error
});

export default id => dispatch => {
    dispatch(fetchPinTemplatesRequest());

    axios
        .get(`${API_URL}/pins/${id}/templates`, getHeaders())
        .then(res => dispatch(fetchPinTemplatesSuccess(res.data)))
        .catch(err => dispatch(fetchPinTemplatesFailure(err.message)));
};
