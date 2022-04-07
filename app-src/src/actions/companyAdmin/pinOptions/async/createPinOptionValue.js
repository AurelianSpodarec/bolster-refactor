import axios from 'axios';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import {
    CREATE_PIN_OPTION_VALUE_REQUEST,
    CREATE_PIN_OPTION_VALUE_SUCCESS,
    CREATE_PIN_OPTION_VALUE_FAILURE,
} from 'constants/actionTypes/pinOptions';

export const createPinOptionValueRequest = () => ({
    type: CREATE_PIN_OPTION_VALUE_REQUEST,
});

export const createPinOptionValueSuccess = payload => ({
    type: CREATE_PIN_OPTION_VALUE_SUCCESS,
    payload,
});

export const createPinOptionValueFailure = error => ({
    type: CREATE_PIN_OPTION_VALUE_FAILURE,
    error,
});

export default postBody => async dispatch => {
    dispatch(createPinOptionValueRequest());

    return axios
        .post(`${API_URL}/pinoptions/options`, postBody, getHeaders())
        .then(res => dispatch(createPinOptionValueSuccess(res.data)))
        .catch(err => dispatch(createPinOptionValueFailure(err.message)));
};
