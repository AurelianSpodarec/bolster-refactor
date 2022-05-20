import axios from 'axios';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import {
    SET_PIN_OPTION_VALUE_AS_NOT_HIDDEN_REQUEST,
    SET_PIN_OPTION_VALUE_AS_NOT_HIDDEN_SUCCESS,
    SET_PIN_OPTION_VALUE_AS_NOT_HIDDEN_FAILURE,
} from 'constants/actionTypes/pinOptions';

export const setOptionValueAsNotHiddenRequest = payload => ({
    type: SET_PIN_OPTION_VALUE_AS_NOT_HIDDEN_REQUEST,
    payload,
});

export const setOptionValueAsNotHiddenSuccess = payload => ({
    type: SET_PIN_OPTION_VALUE_AS_NOT_HIDDEN_SUCCESS,
    payload,
});

export const setOptionValueAsNotHiddenFailure = (error, payload) => ({
    type: SET_PIN_OPTION_VALUE_AS_NOT_HIDDEN_FAILURE,
    error,
    payload,
});

export default option => async dispatch => {
    dispatch(setOptionValueAsNotHiddenRequest(option));

    return axios
        .patch(`${API_URL}/pinoptions/options/${option.id}/hide?undo=true`, null, getHeaders())
        .then(res => dispatch(setOptionValueAsNotHiddenSuccess(res.data)))
        .catch(err => dispatch(setOptionValueAsNotHiddenFailure(err.message, option)));
};
