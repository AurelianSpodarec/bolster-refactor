import axios from 'axios';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import {
    EDIT_PIN_OPTION_VALUE_REQUEST,
    EDIT_PIN_OPTION_VALUE_SUCCESS,
    EDIT_PIN_OPTION_VALUE_FAILURE,
} from 'constants/actionTypes/pinOptions';

export const editPinOptionValueRequest = () => ({
    type: EDIT_PIN_OPTION_VALUE_REQUEST,
});

export const editPinOptionValueSuccess = payload => ({
    type: EDIT_PIN_OPTION_VALUE_SUCCESS,
    payload,
});

export const editPinOptionValueFailure = error => ({
    type: EDIT_PIN_OPTION_VALUE_FAILURE,
    error,
});

export default (pinOptionID, postBody) => async dispatch => {
    dispatch(editPinOptionValueRequest());

    return axios
        .patch(`${API_URL}/pinoptions/options/${pinOptionID}`, postBody, getHeaders())
        .then(res => dispatch(editPinOptionValueSuccess(res.data)))
        .catch(err => dispatch(editPinOptionValueFailure(err.message)));
};
