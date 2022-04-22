import axios from 'axios';

import { ADMIN_API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import {
    FETCH_PIN_OPTION_TYPES_REQUEST,
    FETCH_PIN_OPTION_TYPES_SUCCESS,
    FETCH_PIN_OPTION_TYPES_FAILURE,
} from 'constants/actionTypes/pinOptions';

export const fetchPinOptionTypesRequest = () => ({
    type: FETCH_PIN_OPTION_TYPES_REQUEST,
});

export const fetchPinOptionTypesSuccess = payload => ({
    type: FETCH_PIN_OPTION_TYPES_SUCCESS,
    payload,
});

export const fetchPinOptionTypesFailure = error => ({
    type: FETCH_PIN_OPTION_TYPES_FAILURE,
    error,
});

export default () => async dispatch => {
    dispatch(fetchPinOptionTypesRequest());

    return axios
        .get(`${ADMIN_API_URL}/pinoptions/types`, getHeaders())
        .then(res => dispatch(fetchPinOptionTypesSuccess(res.data)))
        .catch(err => dispatch(fetchPinOptionTypesFailure(err.message)));
};
