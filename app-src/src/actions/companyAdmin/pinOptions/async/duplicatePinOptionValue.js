import axios from 'axios';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import {
    DUPLICATE_PIN_OPTION_VALUE_REQUEST,
    DUPLICATE_PIN_OPTION_VALUE_SUCCESS,
    DUPLICATE_PIN_OPTION_VALUE_FAILURE,
} from 'constants/actionTypes/pinOptions';

export const duplicatePinOptionValueRequest = () => ({
    type: DUPLICATE_PIN_OPTION_VALUE_REQUEST,
});

export const duplicatePinOptionValueSuccess = payload => ({
    type: DUPLICATE_PIN_OPTION_VALUE_SUCCESS,
    payload,
});

export const duplicatePinOptionValueFailure = error => ({
    type: DUPLICATE_PIN_OPTION_VALUE_FAILURE,
    error,
});

export default pinOptionID => async dispatch => {
    dispatch(duplicatePinOptionValueRequest());

    return axios
        .post(`${API_URL}/pinoptions/options/${pinOptionID}/duplicate`, null, getHeaders())
        .then(res => dispatch(duplicatePinOptionValueSuccess(res.data)))
        .catch(err => dispatch(duplicatePinOptionValueFailure(err.message)));
};
