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

export const deletePinOptionValueSuccess = id => ({
    type: DELETE_PIN_OPTION_VALUE_SUCCESS,
    id,
});

export const deletePinOptionValueFailure = error => ({
    type: DELETE_PIN_OPTION_VALUE_FAILURE,
    error,
});

export default optionID => async dispatch => {
    dispatch(deletePinOptionValueRequest());

    return axios
        .delete(`${API_URL}/pinoptions/options/${optionID}`, getHeaders())
        .then(() => dispatch(deletePinOptionValueSuccess(optionID)))
        .catch(err => dispatch(deletePinOptionValueFailure(err.message)));
};
