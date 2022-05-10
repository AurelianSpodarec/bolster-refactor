import axios from 'axios';

import { ADMIN_API_URL } from 'config';
import { getHeaders, handleErrors } from 'helpers/api';
import {
    CREATE_ADMIN_PIN_OPTION_REQUEST,
    CREATE_ADMIN_PIN_OPTION_SUCCESS,
    CREATE_ADMIN_PIN_OPTION_FAILURE,
} from 'constants/actionTypes/pinOptions';

export const createPinOptionValueRequest = () => ({
    type: CREATE_ADMIN_PIN_OPTION_REQUEST,
});

export const createPinOptionValueSuccess = payload => ({
    type: CREATE_ADMIN_PIN_OPTION_SUCCESS,
    payload,
});

export const createPinOptionValueFailure = error => ({
    type: CREATE_ADMIN_PIN_OPTION_FAILURE,
    error,
});

export default postBody => async dispatch => {
    dispatch(createPinOptionValueRequest());

    return axios
        .post(`${ADMIN_API_URL}/pinoptions/options`, postBody, getHeaders())
        .then(res => dispatch(createPinOptionValueSuccess(res.data)))
        .catch(err => {
            dispatch(handleErrors(createPinOptionValueFailure)(err));
        });
};
