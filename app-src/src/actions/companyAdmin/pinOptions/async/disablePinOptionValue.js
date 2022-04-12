import axios from 'axios';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import {
    DISABLE_PIN_OPTION_VALUE_REQUEST,
    DISABLE_PIN_OPTION_VALUE_SUCCESS,
    DISABLE_PIN_OPTION_VALUE_FAILURE,
} from 'constants/actionTypes/pinOptions';

export const disablePinOptionValueRequest = () => ({
    type: DISABLE_PIN_OPTION_VALUE_REQUEST,
});

export const disablePinOptionValueSuccess = payload => ({
    type: DISABLE_PIN_OPTION_VALUE_SUCCESS,
    payload,
});

export const disablePinOptionValueFailure = error => ({
    type: DISABLE_PIN_OPTION_VALUE_FAILURE,
    error,
});

export default id => async dispatch => {
    dispatch(disablePinOptionValueRequest());

    return axios
        .patch(`${API_URL}/pinoptions/options/${id}/disable`, null, getHeaders())
        .then(res => dispatch(disablePinOptionValueSuccess(res.data)))
        .catch(err => dispatch(disablePinOptionValueFailure(err.message)));
};
