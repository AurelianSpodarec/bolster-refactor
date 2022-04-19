import axios from 'axios';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import {
    SET_OPTION_SET_AS_DEFAULT_REQUEST,
    SET_OPTION_SET_AS_DEFAULT_SUCCESS,
    SET_OPTION_SET_AS_DEFAULT_FAILURE,
} from 'constants/actionTypes/pinOptions';

export const setOptionSetAsDefaultRequest = (newSetDefault, oldSetDefault) => ({
    type: SET_OPTION_SET_AS_DEFAULT_REQUEST,
    newSetDefault,
    oldSetDefault,
});

export const setOptionSetAsDefaultSuccess = payload => ({
    type: SET_OPTION_SET_AS_DEFAULT_SUCCESS,
    payload,
});

export const setOptionSetAsDefaultFailure = (error, newSetDefault, oldSetDefault) => ({
    type: SET_OPTION_SET_AS_DEFAULT_FAILURE,
    error,
    newSetDefault,
    oldSetDefault,
});

export default (newSetDefault, oldSetDefault) => async dispatch => {
    dispatch(setOptionSetAsDefaultRequest(newSetDefault, oldSetDefault));

    return axios
        .post(`${API_URL}/pinoptions/sets/${newSetDefault.id}/default`, null, getHeaders())
        .then(res => dispatch(setOptionSetAsDefaultSuccess(res.data)))
        .catch(err => dispatch(setOptionSetAsDefaultFailure(err.message, newSetDefault)));
};
