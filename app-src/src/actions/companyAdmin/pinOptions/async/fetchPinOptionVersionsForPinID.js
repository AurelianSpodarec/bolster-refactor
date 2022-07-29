import axios from 'axios';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import {
    FETCH_PIN_OPTION_VERSIONS_FOR_PIN_ID_REQUEST,
    FETCH_PIN_OPTION_VERSIONS_FOR_PIN_ID_SUCCESS,
    FETCH_PIN_OPTION_VERSIONS_FOR_PIN_ID_FAILURE,
} from 'constants/actionTypes/pinOptions';

export const fetchPinOptionVersionsForPinIDRequest = () => ({
    type: FETCH_PIN_OPTION_VERSIONS_FOR_PIN_ID_REQUEST,
});

export const fetchPinOptionVersionsForPinIDSuccess = payload => ({
    type: FETCH_PIN_OPTION_VERSIONS_FOR_PIN_ID_SUCCESS,
    payload,
});

export const fetchPinOptionVersionsForPinIDFailure = error => ({
    type: FETCH_PIN_OPTION_VERSIONS_FOR_PIN_ID_FAILURE,
    error,
});

export default pinID => async dispatch => {
    dispatch(fetchPinOptionVersionsForPinIDRequest());

    return axios
        .get(`${API_URL}/pinoptions/versionsForPin/${pinID}`, getHeaders())
        .then(res => dispatch(fetchPinOptionVersionsForPinIDSuccess(res.data)))
        .catch(err => dispatch(fetchPinOptionVersionsForPinIDFailure(err.message)));
};
