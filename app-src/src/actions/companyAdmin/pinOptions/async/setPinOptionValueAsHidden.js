import axios from 'axios';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import {
    SET_OPTION_VALUE_AS_HIDDEN_REQUEST,
    SET_OPTION_VALUE_AS_HIDDEN_SUCCESS,
    SET_OPTION_VALUE_AS_HIDDEN_FAILURE,
} from 'constants/actionTypes/pinOptions';

export const setOptionValueAsHiddenRequest = payload => ({
    type: SET_OPTION_VALUE_AS_HIDDEN_REQUEST,
    payload,
});

export const setOptionValueAsHiddenSuccess = payload => ({
    type: SET_OPTION_VALUE_AS_HIDDEN_SUCCESS,
    payload,
});

export const setOptionValueAsHiddenFailure = (error, payload) => ({
    type: SET_OPTION_VALUE_AS_HIDDEN_FAILURE,
    error,
    payload,
});

export default option => async dispatch => {
    dispatch(setOptionValueAsHiddenRequest(option));

    return axios
        .patch(`${API_URL}/pinoptions/options/${option.id}/hide`, null, getHeaders())
        .then(res => dispatch(setOptionValueAsHiddenSuccess(res.data)))
        .catch(err => dispatch(setOptionValueAsHiddenFailure(err.message, option)));
};
