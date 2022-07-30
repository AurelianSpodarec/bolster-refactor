import axios from 'axios';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import {
    DELETE_PIN_OPTION_VALUE_REQUEST,
    DELETE_PIN_OPTION_VALUE_SUCCESS,
    DELETE_PIN_OPTION_VALUE_FAILURE,
} from 'constants/actionTypes/pinOptions';

export const deletePinOptionValueRequest = () => ({
    type: DELETE_PIN_OPTION_VALUE_REQUEST,
});

export const deletePinOptionValueSuccess = payload => ({
    type: DELETE_PIN_OPTION_VALUE_SUCCESS,
    payload,
});

export const deletePinOptionValueFailure = error => ({
    type: DELETE_PIN_OPTION_VALUE_FAILURE,
    error,
});

export default option => async dispatch => {
    dispatch(deletePinOptionValueRequest());

    return axios
        .delete(`${API_URL}/pinoptions/options/${option.id}`, getHeaders())
        .then(() => dispatch(deletePinOptionValueSuccess(option)))
        .catch(err => dispatch(deletePinOptionValueFailure(err.message)));
};
