import axios from 'axios';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import {
    SET_OPTION_SET_AS_HIDDEN_REQUEST,
    SET_OPTION_SET_AS_HIDDEN_SUCCESS,
    SET_OPTION_SET_AS_HIDDEN_FAILURE,
} from 'constants/actionTypes/pinOptions';

export const setOptionSetAsHiddenRequest = payload => ({
    type: SET_OPTION_SET_AS_HIDDEN_REQUEST,
    payload,
});

export const setOptionSetAsHiddenSuccess = payload => ({
    type: SET_OPTION_SET_AS_HIDDEN_SUCCESS,
    payload,
});

export const setOptionSetAsHiddenFailure = (error, payload) => ({
    type: SET_OPTION_SET_AS_HIDDEN_FAILURE,
    error,
    payload,
});

export default set => async dispatch => {
    dispatch(setOptionSetAsHiddenRequest(set));

    return axios
        .post(`${API_URL}/pinoptions/options/${set.id}/hide`, null, getHeaders())
        .then(res => dispatch(setOptionSetAsHiddenSuccess(res.data)))
        .catch(err => dispatch(setOptionSetAsHiddenFailure(err.message, set)));
};
