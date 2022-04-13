import axios from 'axios';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import {
    SET_OPTION_SET_AS_DEFAULT_REQUEST,
    SET_OPTION_SET_AS_DEFAULT_SUCCESS,
    SET_OPTION_SET_AS_DEFAULT_FAILURE,
} from 'constants/actionTypes/pinOptions';

export const setOptionSetAsDefaultRequest = payload => ({
    type: SET_OPTION_SET_AS_DEFAULT_REQUEST,
    payload,
});

export const setOptionSetAsDefaultSuccess = payload => ({
    type: SET_OPTION_SET_AS_DEFAULT_SUCCESS,
    payload,
});

export const setOptionSetAsDefaultFailure = (error, payload) => ({
    type: SET_OPTION_SET_AS_DEFAULT_FAILURE,
    error,
    payload,
});

export default set => async dispatch => {
    dispatch(setOptionSetAsDefaultRequest(set));

    return axios
        .post(`${API_URL}/pinoptions/sets/${set.id}/default`, null, getHeaders())
        .then(res => dispatch(setOptionSetAsDefaultSuccess(res.data)))
        .catch(err => dispatch(setOptionSetAsDefaultFailure(err.message, set)));
};
