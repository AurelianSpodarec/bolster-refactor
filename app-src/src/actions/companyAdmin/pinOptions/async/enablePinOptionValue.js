import axios from 'axios';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import {
    ENABLE_PIN_OPTION_VALUE_REQUEST,
    ENABLE_PIN_OPTION_VALUE_SUCCESS,
    ENABLE_PIN_OPTION_VALUE_FAILURE,
} from 'constants/actionTypes/pinOptions';

export const enablePinOptionValueRequest = () => ({
    type: ENABLE_PIN_OPTION_VALUE_REQUEST,
});

export const enablePinOptionValueSuccess = payload => ({
    type: ENABLE_PIN_OPTION_VALUE_SUCCESS,
    payload,
});

export const enablePinOptionValueFailure = error => ({
    type: ENABLE_PIN_OPTION_VALUE_FAILURE,
    error,
});

export default id => async dispatch => {
    dispatch(enablePinOptionValueRequest());

    return axios
        .patch(`${API_URL}/pinoptions/options/${id}/disable?undo=true`, null, getHeaders())
        .then(res => dispatch(enablePinOptionValueSuccess(res.data)))
        .catch(err => dispatch(enablePinOptionValueFailure(err.message)));
};
