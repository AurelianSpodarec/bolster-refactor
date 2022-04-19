import axios from 'axios';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import {
    ENABLE_PIN_OPTION_VALUE_REQUEST,
    ENABLE_PIN_OPTION_VALUE_SUCCESS,
    ENABLE_PIN_OPTION_VALUE_FAILURE,
} from 'constants/actionTypes/pinOptions';

export const enablePinOptionValueRequest = payload => ({
    type: ENABLE_PIN_OPTION_VALUE_REQUEST,
    payload,
});

export const enablePinOptionValueSuccess = payload => ({
    type: ENABLE_PIN_OPTION_VALUE_SUCCESS,
    payload,
});

export const enablePinOptionValueFailure = (error, payload) => ({
    type: ENABLE_PIN_OPTION_VALUE_FAILURE,
    error,
    payload,
});

export default option => async dispatch => {
    dispatch(enablePinOptionValueRequest(option));

    return axios
        .patch(`${API_URL}/pinoptions/options/${option.id}/disable?undo=true`, null, getHeaders())
        .then(res => dispatch(enablePinOptionValueSuccess(res.data)))
        .catch(err => dispatch(enablePinOptionValueFailure(err.message, option)));
};
